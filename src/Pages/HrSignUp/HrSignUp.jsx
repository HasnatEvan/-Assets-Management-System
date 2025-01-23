import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { imageUpload } from '../../api/utils';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';

const HrSignUp = () => {
    const { signUp, updateUserProfile, user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const axiosPublic = useAxiosPublic();
    // const axiosSecure = useAxiosSecure();

    // const requestHr = async () => {
    //     try {
    //         const { data } = await axiosPublic.patch(`/users/${user?.email}`);
    //         console.log('HR request response:', data);
    //     } catch (err) {
    //         console.error('Error requesting HR role:', err.response?.data || err.message);
    //     }
    // };

    const handleSignup = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value.trim();
        const companyName = form.companyName.value.trim();
        const image = form.image.files[0];
        const email = form.email.value.trim();
        const password = form.password.value;
        const dob = form.dob.value;
        const packageType = form.package.value;

        setIsLoading(true);

        try {
            // Upload image
            const photoURL = await imageUpload(image);

            // Sign up user
            await signUp(email, password);
            await updateUserProfile({
                displayName: name,
                photoURL,
            });

            // Prepare user data
            const userInfo = {
                name,
                companyName,
                photoURL,
                email,
                dob,
                packageType,
                role: 'hr',
            };

            // Send user data to backend
            const res = await axiosPublic.post(`/users/${email}`, userInfo);

            if (res?.data?.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'You have successfully signed up!',
                });
                form.reset();
                navigate('/');
            } else {
                throw new Error('Failed to save user data. Please try again.');
            }
        } catch (error) {
            console.error('Signup Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message || 'Something went wrong. Please try again later.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up for HR</h2>
            <form onSubmit={handleSignup} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="companyName" className="block text-sm font-medium">Company Name</label>
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium">Company Logo</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="dob" className="block text-sm font-medium">Date of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="package" className="block text-sm font-medium">Select a Package</label>
                    <select
                        id="package"
                        name="package"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select Package</option>
                        <option value="5">5 Members for $5</option>
                        <option value="10">10 Members for $8</option>
                        <option value="20">20 Members for $15</option>
                    </select>
                </div>
                <div>
                    <button 
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating your account...' : 'Sign Up'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HrSignUp;
