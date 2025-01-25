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
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Payment for ${packagePrice}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="p-4 bg-gray-100 rounded-md">
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
                    </div>
                    <button
                        type="submit"
                        disabled={!stripe || isProcessing}
                        className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 transition-all"
                    >
                        {isProcessing ? 'Processing...' : `Pay $${packagePrice}`}
                    </button>
                    {error && <p className="text-red-600 text-center">{error}</p>}
                    {transactionId && <p className="text-green-500 text-center">Your Transaction ID: {transactionId}</p>}
                </form>
            </div>
        </div>
    );
};

export default CheckOutForm;
