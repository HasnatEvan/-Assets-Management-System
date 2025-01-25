import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Swal from 'sweetalert2'; // Import SweetAlert2

const AddAnAssets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        const productName = form.name.value;
        const productType = form.type.value;
        const productQuantity = form.quantity.value;

        const hr = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email
        };

        const date = new Date().toISOString(); // Get current date in ISO format

        const assetsData = {
            productName,
            productType,
            productQuantity,
            hr,
            date // Add the date field
        };

        try {
            // Sending the POST request to the server
            const { data } = await axiosSecure.post('/assets', assetsData);
            console.log('Asset added successfully:', data);

            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Asset Added!',
                text: 'Your new asset has been successfully added.',
                confirmButtonText: 'Okay',
            });

            form.reset(); // Reset form after successful submission

            // Navigate to asset list page
            navigate('/dashboard/asset-list');
        } catch (err) {
            console.error('Error adding asset:', err);

            // Show error alert
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'There was an issue adding the asset. Please try again later.',
                confirmButtonText: 'Try Again',
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">𝑨𝒅𝒅 𝒂 𝑵𝒆𝒘 𝑨𝒔𝒔𝒆𝒕</h2>
            <form 
                onSubmit={handleSubmit} 
                className="p-8 bg-gray-50 border border-gray-200 rounded-lg shadow-lg max-w-lg mx-auto"
            >
                {/* Product Name */}
                <div className="mb-6">
                    <label 
                        htmlFor="productName" 
                        className="block text-lg font-medium text-gray-700 mb-2"
                    >
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="productName"
                        name="name"
                        className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter product name"
                        required
                    />
                </div>

                {/* Product Type */}
                <div className="mb-6">
                    <label 
                        htmlFor="productType" 
                        className="block text-lg font-medium text-gray-700 mb-2"
                    >
                        Product Type
                    </label>
                    <select
                        id="productType"
                        name="type"
                        className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    >
                        <option value="" disabled selected>
                            Select type
                        </option>
                        <option value="returnable">Returnable</option>
                        <option value="non-returnable">Non-returnable</option>
                    </select>
                </div>

                {/* Product Quantity */}
                <div className="mb-6">
                    <label 
                        htmlFor="productQuantity" 
                        className="block text-lg font-medium text-gray-700 mb-2"
                    >
                        Product Quantity
                    </label>
                    <input
                        type="number"
                        id="productQuantity"
                        name="quantity"
                        className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter quantity"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-[#2596be] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#1f7ca0] focus:outline-none focus:ring-2 focus:ring-[#2596be] transition duration-200"
                    >
                        Add Asset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAnAssets;
