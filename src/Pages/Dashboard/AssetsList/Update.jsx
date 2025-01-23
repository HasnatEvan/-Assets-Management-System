import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const Update = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const asset = useLoaderData(); // Loaded asset data for pre-filling
    const navigate = useNavigate(); // Navigation hook for redirection

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        const productName = form.name.value;
        const productType = form.type.value;
        const productQuantity = form.quantity.value;

        const updatedAsset = {
            productName,
            productType,
            productQuantity,
        };

        try {
            const { data } = await axiosSecure.patch(`/assets/${asset._id}`, updatedAsset);
            console.log("Asset updated successfully:", data);

            // Show success alert
            Swal.fire({
                icon: "success",
                title: "Asset Updated!",
                text: "The asset has been successfully updated.",
                confirmButtonText: "Okay",
            }).then(() => {
                navigate("/dashboard/asset-list"); // Redirect to the asset list page after success
            });
        } catch (err) {
            console.error("Error updating asset:", err);

            // Show error alert
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "There was an issue updating the asset. Please try again later.",
                confirmButtonText: "Try Again",
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Update Asset</h2>
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
                        defaultValue={asset?.productName}
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
                        defaultValue={asset?.productType || ""}
                    >
                        <option value="" disabled>
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
                        defaultValue={asset?.productQuantity}
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Update;
