import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing the icons
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AssetsList = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetching assets data
    const { data: assets = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['assets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/assets');
            return res.data;
        },
    });

    // Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            return await axiosSecure.delete(`/assets/${id}`);
        },
        onSuccess: () => {
            refetch(); // Refetch the asset list after deletion
        },
    });

    // States for search, filter, and sort
    const [searchText, setSearchText] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterType, setFilterType] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    // Filtered and sorted data
    const filteredAssets = assets
        .filter(asset => asset.productName && asset.productName.toLowerCase().includes(searchText.toLowerCase())) // Check for undefined or null
        .filter(asset => (filterStatus ? asset.productQuantity > 0 === (filterStatus === "available") : true))
        .filter(asset => (filterType ? asset.productType === filterType : true))
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return a.productQuantity - b.productQuantity;
            } else if (sortOrder === "desc") {
                return b.productQuantity - a.productQuantity;
            }
            return 0;
        });

    // Handle Delete
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id); // Trigger delete mutation
                Swal.fire(
                    'Deleted!',
                    'Your asset has been deleted.',
                    'success'
                );
            }
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl text-center font-semibold mb-6">𝑨𝒔𝒔𝒆𝒕𝒔 𝑴𝒂𝒏𝒂𝒈𝒆𝒎𝒆𝒏𝒕</h2>

            {/* Search, Filter, and Sorting Sections */}
            <div className="mb-4 flex flex-wrap gap-4 justify-between">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded w-full sm:w-auto max-w-xs"
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded w-full sm:w-auto max-w-xs"
                >
                    <option value="">Filter by stock</option>
                    <option value="available">Available</option>
                    <option value="out-of-stock">Out of Stock</option>
                </select>
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded w-full sm:w-auto max-w-xs"
                >
                    <option value="">Filter by type</option>
                    <option value="returnable">Returnable</option>
                    <option value="non-returnable">Non-returnable</option>
                </select>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded w-full sm:w-auto max-w-xs"
                >
                    <option value="">Sort by quantity</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            {/* List Section */}
            <div className="overflow-x-auto sm:overflow-visible">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">#</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Type</th>
                            <th className="border border-gray-300 px-4 py-2">Quantity</th>
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAssets.map((asset, index) => (
                            <tr key={asset._id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.productName}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.productType}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{asset.productQuantity}</td>
                                <td className="border border-gray-300 px-4 py-2">{new Date(asset.date).toLocaleDateString()}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <Link to={`/dashboard/updatedItem/${asset._id}`}>
                                        <button className="px-2 py-1 bg-[#2596BE] text-white rounded mr-2 flex items-center">
                                            <FaEdit />
                                        </button>
                                    </Link>
                                    <button onClick={() => handleDelete(asset._id)} className="px-2 py-1 bg-red-600 text-white rounded flex items-center">
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetsList;
