import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { imageUpload } from '../../api/utils';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import GoogleLogin from '../../Shared/GoogleLogin';

const EmSignUp = () => {
    const { signUp, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const axiosPublic = useAxiosPublic();

    const handleSignup = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const dob = form.dob.value;
        const image = form.image.files[0];

        setIsLoading(true);
        setIsImageUploading(true);

        try {
            // Image Upload
            const photoURL = image ? await imageUpload(image) : null;

            // Sign Up User
            await signUp(email, password);
            await updateUserProfile({
                displayName: name,
                photoURL,
            });

            // Save User Info to Database
            const userInfo = {
                name,
                photoURL,
                email,
                dob,
                role: '',
                status: 'requested', // Default status
            };

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
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message || 'Something went wrong. Please try again later.',
            });
        } finally {
            setIsLoading(false);
            setIsImageUploading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up as Employee</h2>
            <form onSubmit={handleSignup} className="space-y-4">
                {/* Full Name */}
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="name"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Profile Picture */}
                <div>
                    <label htmlFor="profilePicture" className="block text-sm font-medium">Profile Picture</label>
                    <input
                        type="file"
                        id="profilePicture"
                        name="image"
                        accept="image/*"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                        onChange={handleImageChange}
                    />
                    {imagePreview && (
                        <div className="mt-2">
                            <img
                                src={imagePreview}
                                alt="Profile Preview"
                                className="w-32 h-32 object-cover rounded-full"
                            />
                        </div>
                    )}
                </div>

                {/* Email */}
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

                {/* Password */}
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

                {/* Date of Birth */}
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

                {/* Sign Up Button */}
                <div className="relative">
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md"
                        disabled={isLoading || isImageUploading}
                    >
                        {isLoading || isImageUploading ? (
                            <div className="flex justify-center">
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                                    <path fill="currentColor" d="M4 12a8 8 0 1 1 8 8 8 8 0 0 1-8-8z" className="opacity-75" />
                                </svg>
                                Creating your account...
                            </div>
                        ) : 'Sign Up'}
                    </button>
                </div>

                {/* Google Login */}
                <div className="mt-5">
                    <GoogleLogin />
                </div>
            </form>
        </div>
    );
};

export default EmSignUp;
