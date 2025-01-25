import React from 'react';
import { useLocation } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutFrom from "./CheckOutFrom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT);

const Payment = () => {
    const location = useLocation();
    const packagePrice = location.state?.packagePrice || 0; // Get package price from navigation state
    const noHeaderFooter = location.pathname.includes('/payment'); // Check if it's the payment page

    return (
        <div>
            {!noHeaderFooter && <header>Header content here</header>} {/* Conditionally render header */}
            
            <h2 className="text-xl font-bold">Payment for ${packagePrice}</h2>

            <Elements stripe={stripePromise}>
                <CheckOutFrom packagePrice={packagePrice} />
            </Elements>

            {!noHeaderFooter && <footer>Footer content here</footer>} {/* Conditionally render footer */}
        </div>
    );
};

export default Payment;
