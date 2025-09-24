import httpErrors from 'http-errors';
import Subscription from '../models/subscription.model.js';
import { INTERVALS, PLAN_PRICE_IDS, STATUS_CODES } from '../constants/index.js';
import {
  createCheckoutSession,
  createCustomer,
  stripe
} from './stripe.service.js';
import { checkField } from '../utils/index.js';
import Users from '../models/user.model.js';

class PaymentService {
  static async generateCheckoutSession(user, planName, interval) {
    const priceId = PLAN_PRICE_IDS[interval]?.[planName];
    checkField(!priceId, 'Invalid plan selected');

    if (planName === 'Free' && interval === INTERVALS.MONTHLY) {
      const activePaidSubscription = await Subscription.findOne({
        user: user._id,
        isActive: true,
        interval: INTERVALS.MONTHLY,
        planName: { $ne: 'Free' }
      });

      checkField(
        activePaidSubscription,
        'You cannot downgrade your subscription from a paid plan to Free.'
      );
    }

    const activeSubscription = await Subscription.findOne({
      user: user._id,
      interval,
      isActive: true
    });

    if (activeSubscription) {
      checkField(
        activeSubscription.planName === planName,
        `You are already subscribed to the ${planName} plan.`
      );
    }

    const subscription = await Subscription.findOne({ user: user._id });

    const customerId = await createCustomer(
      user,
      planName,
      interval,
      subscription
    );

    const session = await createCheckoutSession(
      customerId,
      priceId,
      user._id.toString(),
      planName,
      interval
    );

    return session;
  }

  static async handleWebhookEvent(event) {
    const data = event.data.object;
    const eventType = event.type;

    switch (eventType) {
      case 'checkout.session.completed':
        await PaymentService.processCheckoutCompleted(data);
        break;
      case 'invoice.payment_succeeded':
        await PaymentService.processPaymentSucceeded(data);
        break;
      case 'invoice.payment_failed':
        await PaymentService.processPaymentFailed(data);
        break;
      default:
        console.log('Unhandled Stripe event:', eventType);
    }
  }

  static async processCheckoutCompleted(session) {
    const userId = session.metadata.userId;
    const customerId = session.customer;
    const subscriptionId = session.subscription;

    const existing = await Subscription.findOne({
      user: userId,
      isActive: true
    });
    if (existing?.subscriptionId) {
      await stripe.subscriptions.cancel(existing.subscriptionId);
    }

    await Subscription.findOneAndUpdate(
      { user: userId },
      {
        stripeCustomerId: customerId,
        subscriptionId: subscriptionId,
        isCancelled: false
      },
      { new: true, upsert: true }
    );

    await Users.findByIdAndUpdate(userId, { subscribed: true });
  }

  static async processPaymentSucceeded(invoice) {
    const { interval, planName, userId } =
      invoice.parent.subscription_details.metadata;

    const startDate = new Date();
    const endDate =
      interval === INTERVALS.MONTHLY
        ? new Date(new Date(startDate).setMonth(startDate.getMonth() + 1))
        : new Date(
            new Date(startDate).setFullYear(startDate.getFullYear() + 1)
          );

    await Subscription.findOneAndUpdate(
      { user: userId },
      {
        startDate,
        endDate,
        interval,
        planName,
        isActive: true
      },
      { new: true, upsert: true }
    );
  }

  static async processPaymentFailed(invoice) {
    const subscriptionId = invoice.subscription;

    await Subscription.findOneAndUpdate(
      { subscriptionId },
      {
        isActive: false,
        planName: 'Free',
        interval: INTERVALS.MONTHLY,
        startDate: null,
        endDate: null
      }
    );
  }

  static async cancelUserSubscription(userId) {
    const subscription = await Subscription.findOne({ user: userId }).select(
      'subscriptionId'
    );

    checkField(
      !subscription?.subscriptionId,
      'No subscription found for this user.'
    );

    await stripe.subscriptions.cancel(subscription?.subscriptionId);

    Object.assign(subscription, {
      isCancelled: true,
      isActive: false,
      startDate: null,
      endDate: null,
      interval: INTERVALS.MONTHLY,
      planName: 'Free'
    });

    await subscription.save();
    await Users.findByIdAndUpdate(userId, { subscribed: false });

    return subscription;
  }

  static async createSubscription({
    userId,
    planName = 'Free',
    interval = INTERVALS.MONTHLY,
    isActive = true,
    startDate = new Date(),
    endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1))
  }) {
    if (!userId)
      throw httpErrors(
        STATUS_CODES.BAD_REQUEST,
        'User ID is required for subscription'
      );

    const subscription = await Subscription.create({
      user: userId,
      planName,
      interval,
      isActive,
      startDate,
      endDate
    });

    return subscription;
  }
}

export default PaymentService;
