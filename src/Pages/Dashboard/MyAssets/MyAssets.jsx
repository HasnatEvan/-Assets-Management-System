import React, { useEffect, useState } from "react"; // Add useEffect here
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import RequestData from "./RequestData";

// Debounce hook for search functionality
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const MyAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // State for search and filters
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    status: "all", // Options: "all", "Pending", "Approved"
    assetType: "all", // Options: "all", "Returnable", "Non-returnable"
  });

  const debouncedSearch = useDebounce(search, 500); // Debounced search input

  // Fetch data using `useQuery`
  const { data: request = [], isLoading, refetch } = useQuery({
    queryKey: ["request", user?.email, debouncedSearch, filter],
    queryFn: async () => {
      const params = {
        search: debouncedSearch || undefined,
        status: filter.status !== "all" ? filter.status : undefined,
        assetType: filter.assetType !== "all" ? filter.assetType : undefined,
      };
      const { data } = await axiosSecure.get(`/employ-request/${user?.email}`, { params });
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Requests</h1>

      {/* Search Section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by asset name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 border-gray-300 w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        />
      </div>

      {/* Filter Section */}
      <div className="flex space-x-6 mb-6">
        <div className="flex-1">
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="border w-full p-3 rounded-md"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
          </select>
        </div>
        <div className="flex-1">
          <select
            value={filter.assetType}
            onChange={(e) => setFilter({ ...filter, assetType: e.target.value })}
            className="border w-full p-3 rounded-md"
          >
            <option value="all">All Asset Types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>
      </div>

      {/* Data Rendering */}
      <div>
        {request.length > 0 ? (
          request.map((requestData) => (
            <RequestData key={requestData._id} refetch={refetch} requestData={requestData} />
          ))
        ) : (
          <p>No requests found matching the criteria.</p>
        )}
      </div>
    </div>
  );
};

export default MyAssets;
