import Stripe from 'stripe';
import Subscription from '../models/subscription.model.js';
import { FRONTEND_URL, STRIPE_SECRET_KEY } from '../configs/env.config.js';
export const stripe = new Stripe(STRIPE_SECRET_KEY);

/**
 * Create or return an existing Stripe Customer for a user.
 *
 * @param {Object} user - User object from DB
 * @param {String} planName - Name of the plan (e.g., 'Free', 'Pro')
 * @param {String} interval - 'monthly' or 'yearly'
 * @param {Object} subscription - Existing subscription document (optional)
 * @returns {String} - Stripe Customer ID
 */
export const createCustomer = async (
  user,
  planName,
  interval,
  subscription
) => {
  // If user already has a Stripe customer ID in subscription, return it
  if (subscription && subscription.stripeCustomerId) {
    return subscription.stripeCustomerId;
  }

  // Create a new customer in Stripe
  const customer = await stripe.customers.create({
    email: user.email,
    name: user.fullName,
    metadata: {
      userId: user._id.toString(),
      planName,
      interval
    }
  });

  // Save the Stripe customer ID in subscription (if exists) or create a new subscription doc
  if (subscription) {
    subscription.stripeCustomerId = customer.id;
    await subscription.save();
  } else {
    await Subscription.create({
      user: user._id.toString(),
      stripeCustomerId: customer.id,
      planName,
      interval,
      isActive: false
    });
  }

  return customer.id;
};

/**
 * Create a Stripe Checkout Session for a subscription plan
 *
 * @param {string} customerId - Stripe Customer ID for the user
 * @param {string} priceId - Stripe Price ID for the subscription plan
 * @param {string} userId - Internal database ID of the user
 * @param {string} planName - Name of the subscription plan (e.g., 'basic', 'pro')
 * @param {string} interval - Billing interval of the plan ('monthly' or 'yearly')
 * @returns {Promise<Object>} - Returns the Stripe Checkout Session object
 */

export const createCheckoutSession = async (
  customerId,
  priceId,
  userId,
  planName,
  interval
) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    customer: customerId,
    subscription_data: {
      metadata: { userId: userId?.toString(), planName, interval }
    },
    metadata: { userId, planName, interval },
    success_url: `${FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${FRONTEND_URL}/payment/cancel`
  });

  return session;
};
