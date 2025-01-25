import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { imageUpload } from '../../api/utils';
import useAxiosPublic from '../../Hooks/useAxiosPublic';  // নিশ্চিত করুন এটি সঠিকভাবে ইমপোর্ট হয়েছে
import { Helmet} from 'react-helmet-async';

const HrSignUp = () => {
    const { signUp, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [packagePrice, setPackagePrice] = useState(0); // প্যাকেজ মূল্য

    const handlePackageChange = (event) => {
        const selectedPackage = event.target.value;
        switch (selectedPackage) {
            case '5':
                setPackagePrice(5); // 5 সদস্যের প্যাকেজ মূল্য
                break;
            case '10':
                setPackagePrice(8); // 10 সদস্যের প্যাকেজ মূল্য
                break;
            case '20':
                setPackagePrice(15); // 20 সদস্যের প্যাকেজ মূল্য
                break;
            default:
                setPackagePrice(0);
        }
    };

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
            // Image upload
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
                packagePrice, // প্যাকেজ মূল্য
                role: 'hr',
            };

            // Send user data to backend
            const axiosPublic = useAxiosPublic();  // axiosPublic ডিফাইন করা হবে
            const res = await axiosPublic.post(`/users/${email}`, userInfo);

            if (res?.data?.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'You have successfully signed up!',
                });
                form.reset();
                navigate('/payment', { state: { packagePrice } }); // প্যাকেজ মূল্য Payment কম্পোনেন্টে পাঠানো হবে
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
      <div>
          <Helmet>
                <title>Manage Mate || Hr Sign Up</title>
            </Helmet>
          <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up for HR</h2>
            <form onSubmit={handleSignup} className="space-y-4">
                {/* Form Fields */}
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
                        onChange={handlePackageChange} // handle change event
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
      </div>
    );
};

export default HrSignUp;
