import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";

const CheckOutForm = ({ packagePrice }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Fetch client secret from the backend
        const createPaymentIntent = async () => {
            try {
                const res = await axiosSecure.post('/create-payment-intent', { price: packagePrice });
                setClientSecret(res.data.clientSecret);
            } catch (error) {
                console.error("Error creating payment intent:", error);
            }
        };
        createPaymentIntent();
    }, [packagePrice, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsProcessing(true);

        if (!stripe || !elements) {
            setError("Stripe is not loaded yet.");
            setIsProcessing(false);
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            setError("Card information is required.");
            setIsProcessing(false);
            return;
        }

        try {
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous',
                    },
                },
            });

            if (confirmError) {
                setError(confirmError.message);
            } else if (paymentIntent?.status === 'succeeded') {
                setError('');
                setTransactionId(paymentIntent.id);

                console.log("Payment successful!", paymentIntent);

                // Redirect to the dashboard upon successful payment
                navigate('/dashboard');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
                {isProcessing ? 'Processing...' : `Pay $${packagePrice}`}
            </button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
            {transactionId && <p className="text-green-500 mt-2">Your Transaction ID: {transactionId}</p>}
        </form>
    );
};

export default CheckOutForm;
