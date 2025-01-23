import React from 'react';
import { FcGoogle } from 'react-icons/fc'; // Google icon
import useAuth from '../Hooks/useAuth'; // Custom hook for authentication
import useAxiosPublic from '../Hooks/useAxiosPublic'; // Custom hook for making public API requests

const GoogleLogin = () => {
    const { signInWithGoogle } = useAuth(); // Get the sign-in function from useAuth
    const axiosPublic = useAxiosPublic(); // Initialize the Axios hook

    // Handle Google login
    const handleGoogleLogin = async () => {
        try {
            // Sign in with Google
            const result = await signInWithGoogle();
            const user = result.user;
            console.log(user);

            // Prepare user info
            const userInfo = {
                email: user?.email,
                name: user?.displayName,
                role: 'employee',  // You may adjust this role based on your app's logic
            };

            // Send user info to the backend
            const res = await axiosPublic.post(`/users/${user?.email}`, userInfo);

            if (res.data.insertedId) {
                console.log('User added successfully');
            } else if (res.data.existingUser) {
                console.log('User already exists, login successful');
            }
        } catch (error) {
            console.error("Error during Google login:", error);
        }
    };

    return (
        <div className="flex justify-center">
            <button
                onClick={handleGoogleLogin} // Attach the click handler
                className="flex items-center px-10 py-3 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg hover:border-gray-400 transition duration-300 ease-in-out focus:outline-none"
            >
                <FcGoogle className="text-2xl mr-3" /> {/* Google Icon */}
                <span className="text-gray-700 font-medium">Sign in with Google</span>
            </button>
        </div>
    );
};

export default GoogleLogin;
