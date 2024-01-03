import { useState } from "react";
import { VscError } from "react-icons/vsc";

const cartItems = [];
const subTotal = 4000;
const tax = Math.round(subTotal * 0.005);
const shippingCharge = 200;
const discount = 100;
const total = subTotal + shippingCharge + tax;

const Cart = () => {
    const [couponCode, setCouponCode] = useState<string>('cart');
    const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
    return (
        <div className="cart">
            <main></main>
            <aside>
                <p>Subtotal : $ {subTotal}</p>
                <p>Shipping Charges : $ {shippingCharge}</p>
                <p>Tax : $ {tax}</p>
                <p>Discount : <em>- $ {discount}</em> </p>
                <strong>Total : $ {total}</strong>

                <input type="text" placeholder="Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />

                {
                    couponCode && (
                        isValidCouponCode ? (
                            <span className="green">$ {discount} off using the <code>{couponCode}
                            </code></span>
                        ) : (
                            <span className="red">Invalid Coupon <VscError /></span>
                        )
                    )
                }
            </aside>
        </div>
    );
};

export default Cart;