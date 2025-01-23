import { useQuery, useMutation } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa"; // Importing trash icon
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyEmploy = () => {
    const axiosSecure = useAxiosSecure();

    // Fetching the employee data
    const { data: myEmploy = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['myEmploy'],
        queryFn: async () => {
            const response = await axiosSecure('/get-employ-users');
            console.log("Fetched Response:", response); // পুরো রেসপন্স দেখাও
            return response.data?.data || []; // শুধুমাত্র data প্রপার্টি রিটার্ন করো
        },
    });

    // Mutation for removing employee (set role to null)
    const { mutate: removeEmployee } = useMutation({
        mutationFn: async (employeeId) => {
            const response = await axiosSecure.patch(`/remove-employee/${employeeId}`); // PATCH রিকোয়েস্ট পাঠানো
            return response.data;
        },
        onSuccess: () => {
            refetch(); // After successful removal, refetch the data
        }
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="p-4 md:p-6">
            <h1 className="text-2xl font-semibold mb-4 text-center">Employee List</h1>
            <button 
                onClick={() => refetch()} 
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Refresh
            </button>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 text-sm md:text-base">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myEmploy.map((employ) => (
                            <tr key={employ._id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">
                                    <img 
                                        src={employ.photoURL} 
                                        alt={employ.name} 
                                        className="w-12 h-12 md:w-16 md:h-16 rounded-full"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{employ.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{employ.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{employ.role}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button 
                                        onClick={() => removeEmployee(employ._id)} // removeEmployee ফাংশন কল করা
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md flex items-center justify-center"
                                    >
                                        <FaTrash /> {/* Only icon */}
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

export default MyEmploy;
