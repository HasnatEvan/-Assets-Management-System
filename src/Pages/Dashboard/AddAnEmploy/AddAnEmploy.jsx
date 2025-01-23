import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AddEmployTable from "./AddEmployTable";

const AddAnEmploy = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch employ users using React Query
    const { data: emUsers = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['emUsers'],
        queryFn: async () => {
            const response = await axiosSecure('/employ-user');
            console.log("Fetched Response:", response); // পুরো রেসপন্স দেখাও
            return response.data?.data || []; // শুধুমাত্র data প্রপার্টি রিটার্ন করো
        },
    });

    // If loading, show a loading state
    if (isLoading) {
        return <p>Loading...</p>;
    }

    // If error, show an error message
    if (isError) {
        console.error("Error fetching data:", error);
        return <p>Error fetching user data! {error?.message || "Unknown error occurred"}</p>;
    }

    // Check the data structure in console
    console.log("emUsers:", emUsers);

    return (
        <div className="p-4 md:p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">Employee List</h2>
            {emUsers.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">DOB</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emUsers.map((emUser) => (
                                <AddEmployTable key={emUser._id} emUser={emUser} refetch={refetch} />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500">No employees found.</p>
            )}
        </div>
    );
};

export default AddAnEmploy;
