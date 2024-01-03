import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../../components/cartItem/CartItem";
import { Link } from "react-router-dom";

const cartItems = [
    {
        productId: '32439usd',
        photoUrl: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/41GFCpGReNL._AC_UY327_FMwebp_QL65_.jpg',
        name: 'iPhone',
        price: 3000,
        quantity: 40,
        stock: 10,
    },
    {
        productId: '3233439usd',
        photoUrl: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/41GFCpGReNL._AC_UY327_FMwebp_QL65_.jpg',
        name: 'iPhone',
        price: 3000,
        quantity: 40,
        stock: 10,
    }
];
const subTotal = 4000;
const tax = Math.round(subTotal * 0.005);
const shippingCharge = 200;
const discount = 100;
const total = subTotal + shippingCharge + tax;

const Cart = () => {
    const [couponCode, setCouponCode] = useState<string>('');
    const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (Math.random() > 0.5) {
                setIsValidCouponCode(true);
            } else {
                setIsValidCouponCode(false);
            }
        }, 1000);

        return () => {
            clearInterval(timeOutId);
            setIsValidCouponCode(false);
        };
    }, [couponCode]);
    return (
        <div className="cart">
            <main>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <CartItem key={item.productId} cartItem={item} />
                    ))
                ) : <h1>No Items Added.</h1>}
            </main>
            <aside>
                <p>Subtotal : ${subTotal}</p>
                <p>Shipping Charges : ${shippingCharge}</p>
                <p>Tax : $ {tax}</p>
                <p>Discount : <em className="red">- ${discount}</em> </p>
                <strong>Total : ${total}</strong>

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

                {cartItems.length > 0 && <Link to={'/shipping'}>Checkout</Link>}
            </aside>
        </div>
    );
};

export default Cart;