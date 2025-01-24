import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const EmployHome = () => {
  const { user } = useAuth(); // Custom hook for user authentication
  const axiosSecure = useAxiosSecure(); // Custom axios instance
  const [pendingRequests, setPendingRequests] = useState([]);
  const [monthlyRequests, setMonthlyRequests] = useState([]);
  const [date, setDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState([]);

  // Pagination states
  const [pendingPage, setPendingPage] = useState(1);
  const [monthlyPage, setMonthlyPage] = useState(1);
  const itemsPerPage = 3;

  // Fetch pending requests
  useEffect(() => {
    const fetchPendingRequests = async () => {
      if (user?.email) {
        try {
          const response = await axiosSecure.get(
            `/employ-request/${user.email}`
          );
          const data = response.data;
          const pending = data.filter(
            (req) => req.status?.toLowerCase() === "pending"
          );
          setPendingRequests(pending);
        } catch (error) {
          console.error("Error fetching pending requests:", error);
        }
      }
    };

    fetchPendingRequests();
  }, [user?.email, axiosSecure]);

  // Fetch monthly requests
  useEffect(() => {
    const fetchMonthlyRequests = async () => {
      if (user?.email) {
        try {
          const response = await axiosSecure.get(
            `/employ-request/${user.email}`
          );
          const data = response.data;
          const currentMonth = new Date().getMonth();
          const monthly = data
            .filter(
              (req) => new Date(req.requestDate).getMonth() === currentMonth
            )
            .sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));
          setMonthlyRequests(monthly);
        } catch (error) {
          console.error("Error fetching monthly requests:", error);
        }
      }
    };

    fetchMonthlyRequests();
  }, [user?.email, axiosSecure]);

  // Handle date changes
  const onDateChange = (newDate) => {
    setDate(newDate);
  };

  // Mark specific dates
  const markDates = () => {
    const requestsDates = [...pendingRequests, ...monthlyRequests].map((req) =>
      new Date(req.requestDate).toLocaleDateString()
    );
    setMarkedDates(requestsDates);
  };

  useEffect(() => {
    markDates();
  }, [pendingRequests, monthlyRequests]);

  // Highlight marked dates on the calendar
  const tileClassName = ({ date }) => {
    const dateString = date.toLocaleDateString();
    if (markedDates.includes(dateString)) {
      return "bg-blue-500 text-white rounded-full hover:bg-blue-600";
    }
    return "hover:bg-gray-200 rounded";
  };

  // Pagination helper function
  const paginate = (items, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const pendingRequestsPaginated = paginate(pendingRequests, pendingPage);
  const monthlyRequestsPaginated = paginate(monthlyRequests, monthlyPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Employee Dashboard
      </h2>

      {/* Grid Layout for Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Pending Requests Section */}
        <div className="bg-white shadow rounded-lg p-6 h-full">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            My Pending Requests
          </h3>
          {pendingRequestsPaginated.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {pendingRequestsPaginated.map((request) => (
                <li
                  key={request._id}
                  className="p-4 hover:bg-gray-50 transition-all rounded"
                >
                  <p>
                    <strong className="text-gray-600">Asset:</strong>{" "}
                    {request.productName || "N/A"}
                  </p>
                  <p>
                    <strong className="text-gray-600">Status:</strong>{" "}
                    {request.status}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No pending requests found.</p>
          )}
          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setPendingPage((prev) => Math.max(prev - 1, 1))}
              disabled={pendingPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setPendingPage((prev) =>
                  prev * itemsPerPage < pendingRequests.length ? prev + 1 : prev
                )
              }
              disabled={pendingPage * itemsPerPage >= pendingRequests.length}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Monthly Requests Section */}
        <div className="bg-white shadow rounded-lg p-6 h-full">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            My Monthly Requests
          </h3>
          {monthlyRequestsPaginated.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {monthlyRequestsPaginated.map((request) => (
                <li
                  key={request._id}
                  className="p-4 hover:bg-gray-50 transition-all rounded"
                >
                  <p>
                    <strong className="text-gray-600">Asset:</strong>{" "}
                    {request.productName || "N/A"}
                  </p>
                  <p>
                    <strong className="text-gray-600">Status:</strong>{" "}
                    {request.status}
                  </p>
                  <p>
                    <strong className="text-gray-600">Requested On:</strong>{" "}
                    {new Date(request.requestDate).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No requests found for this month.</p>
          )}
          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setMonthlyPage((prev) => Math.max(prev - 1, 1))}
              disabled={monthlyPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setMonthlyPage((prev) =>
                  prev * itemsPerPage < monthlyRequests.length ? prev + 1 : prev
                )
              }
              disabled={monthlyPage * itemsPerPage >= monthlyRequests.length}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="mt-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Select a Date
          </h3>
          <Calendar
            onChange={onDateChange}
            value={date}
            tileClassName={tileClassName}
            className="react-calendar p-2 rounded-lg shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployHome;
