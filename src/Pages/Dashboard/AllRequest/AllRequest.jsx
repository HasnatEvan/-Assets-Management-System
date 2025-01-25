import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Importing icons

const AllRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: request = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["request", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/hr-request/${user?.email}`);
      return data;
    },
  });

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/hr-request/approve/${id}`);
      Swal.fire("Success", "Request approved successfully.", "success");
      refetch();
    } catch (error) {
      console.error("Error approving request:", error);
      Swal.fire("Error", "An error occurred while approving the request.", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, reject it!",
      });

      if (result.isConfirmed) {
        const response = await axiosSecure.delete(`/request/${id}`);
        if (response.data.deletedCount > 0) {
          Swal.fire("Rejected!", "The request has been rejected.", "success");
          refetch();
        } else {
          Swal.fire("Error", "Failed to reject the request.", "error");
        }
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
      Swal.fire("Error", "An error occurred while rejecting the request.", "error");
    }
  };

  // Filtering requests based on email or name
  const filteredRequests = request.filter(
    (req) =>
      req.requesterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.requesterEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        <h3>Error fetching requests</h3>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">𝑹𝒆𝒒𝒖𝒆𝒔𝒕 𝑳𝒊𝒔𝒕</h2>

      {/* Search Section */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Refresh Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={refetch}
          className="bg-[#2596be] hover:bg-[#1f7ca0] text-white px-4 py-2 rounded"
        >
          Refresh Data
        </button>
      </div>

      {/* Request List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-sm text-sm md:text-base">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Asset Name</th>
              <th className="border border-gray-300 px-4 py-2">Asset Type</th>
              <th className="border border-gray-300 px-4 py-2">Requester Email</th>
              <th className="border border-gray-300 px-4 py-2">Requester Name</th>
              <th className="border border-gray-300 px-4 py-2">Request Date</th>
              <th className="border border-gray-300 px-4 py-2">Notes</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 py-4">
                  No matching requests found.
                </td>
              </tr>
            ) : (
              filteredRequests.map((req) => (
                <tr key={req._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{req.assetName}</td>
                  <td className="border border-gray-300 px-4 py-2">{req.assetType}</td>
                  <td className="border border-gray-300 px-4 py-2">{req.requesterEmail}</td>
                  <td className="border border-gray-300 px-4 py-2">{req.requesterName}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(req.requestDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{req.notes}</td>
                  <td className="border border-gray-300 px-4 py-2">{req.status}</td>
                  <td className="border border-gray-300 px-4 py-2 flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => handleApprove(req._id)}
                      className="bg-[#2596be] hover:bg-[#1f7ca0] text-white px-3 py-1 rounded flex items-center"
                    >
                      <FaCheckCircle />
                    </button>
                    <button
                      onClick={() => handleReject(req._id)}
                      className="bg-red-600 hover:bg-[#1f7ca0] text-white px-3 py-1 rounded flex items-center"
                    >
                      <FaTimesCircle />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequest;
