import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2'; // Import SweetAlert2

const AddAnAssets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

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
        } catch (err) {
            // Log error or show a notification to the user
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
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Add New Asset</h2>
            <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="productName"
                        name="name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter product name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="productType" className="block text-sm font-medium text-gray-700">
                        Product Type
                    </label>
                    <select
                        id="productType"
                        name="type"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    >
                        <option value="" disabled selected>
                            Select type
                        </option>
                        <option value="returnable">Returnable</option>
                        <option value="non-returnable">Non-returnable</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="productQuantity" className="block text-sm font-medium text-gray-700">
                        Product Quantity
                    </label>
                    <input
                        type="number"
                        id="productQuantity"
                        name="quantity"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter quantity"
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAnAssets;
