import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure"; // আপনার axios hook

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();

  // Fetching the employee data
  const { data: myEmploy = [], isLoading, isError, error } = useQuery({
    queryKey: ['myEmploy'],
    queryFn: async () => {
      const response = await axiosSecure('/get-employ-users');
      return response.data?.data || []; // শুধু ডাটা ফিল্ড রিটার্ন করো
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">My Team</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-4">Image</th>
              <th className="border border-gray-300 p-4">Name</th>
              <th className="border border-gray-300 p-4">Email</th>
              <th className="border border-gray-300 p-4">Role</th>
            </tr>
          </thead>
          <tbody>
            {myEmploy.map((employ) => (
              <tr key={employ._id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="border border-gray-300 p-4">
                  <img
                    src={employ.photoURL}
                    alt={employ.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto"
                  />
                </td>
                <td className="border border-gray-300 p-4 text-center">{employ.name}</td>
                <td className="border border-gray-300 p-4 text-center">{employ.email}</td>
                <td className="border border-gray-300 p-4 text-center">{employ.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTeam;
