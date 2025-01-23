import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useState, useEffect } from "react";
import RequestTAble from "./RequestTAble";

// Custom hook for debouncing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const RequestForAsset = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    availability: "all", // "all", "available", "out-of-stock"
    assetType: "all", // "all", "returnable", "non-returnable"
  });

  // Apply debounce to search input
  const debouncedSearch = useDebounce(search, 500); // Wait for 500ms after the user stops typing

  // Fetch data using useQuery
  const { data: assets, isLoading, error } = useQuery({
    queryKey: ["asset", debouncedSearch, filter], // Adding debounced search and filter as dependencies
    queryFn: async () => {
      // Prepare the query parameters based on the filter and debounced search
      const { availability, assetType } = filter;
      const query = {
        search: debouncedSearch,
        availability: availability !== "all" ? availability : undefined,
        assetType: assetType !== "all" ? assetType : undefined,
      };

      const response = await axiosPublic.get("/assets", { params: query });
      return response.data;
    },
  });

  // Render a loading message or the fetched data
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading assets!</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Asset List</h1>

      {/* Search Section */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by asset name"
          className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        />
      </div>

      {/* Filter Section */}
      <div className="flex space-x-6 mb-6">
        <div className="flex-1">
          <select
            value={filter.availability}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, availability: e.target.value }))
            }
            className="border p-2 w-full rounded-md"
          >
            <option value="all">All Availability</option>
            <option value="available">Available</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>

        <div className="flex-1">
          <select
            value={filter.assetType}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, assetType: e.target.value }))
            }
            className="border p-2 w-full rounded-md"
          >
            <option value="all">All Asset Types</option>
            <option value="returnable">Returnable</option>
            <option value="non-returnable">Non-returnable</option>
          </select>
        </div>
      </div>

      {/* Assets List Section */}
      {assets?.map((asset) => (
        <RequestTAble key={asset._id} asset={asset} />
      ))}
    </div>
  );
};

export default RequestForAsset;
