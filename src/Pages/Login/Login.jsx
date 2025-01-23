import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';  // SweetAlert2 Import
import { useNavigate } from 'react-router-dom';  // For redirecting
import GoogleLogin from '../../Shared/GoogleLogin';

const Login = () => {
    const { logIn, loading } = useAuth();
    const [error, setError] = useState(''); // State for error message
    const navigate = useNavigate();  // Hook to navigate to different pages

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            await logIn(email, password);
            // Show SweetAlert on successful login
            Swal.fire({
                title: 'Login Successful!',
                text: 'Welcome back!',
                icon: 'success',
                confirmButtonText: 'Go to Home',
            }).then(() => {
                navigate('/');  // Redirect to Home page after confirmation
            });
        } catch (error) {
            setError('Invalid email or password. Please try again.'); // Set error message
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Login</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Error message */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* Forgot Password */}
                    <div className="flex justify-between items-center">
                        <div className="text-sm">
                            <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</a>
                        </div>
                    </div>

                    {/* Login Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? (
                                <div className="flex justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                                        <path fill="currentColor" d="M4 12a8 8 0 1 1 8 8 8 8 0 0 1-8-8z" className="opacity-75" />
                                    </svg>
                                    Logging In...
                                </div>
                            ) : 'Login'}
                        </button>
                   <div className='mt-5'>
                   <GoogleLogin></GoogleLogin>
                   </div>
                    </div>

                    {/* Sign Up */}
                    <div className="text-center text-sm text-gray-600">
                        <p>Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
