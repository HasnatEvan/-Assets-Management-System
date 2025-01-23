import { useState, useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2"; // Import SweetAlert2

const RequestTable = ({ asset }) => {
  const { user } = useAuth(); // Get user data from the auth hook
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState(""); // State to hold the notes data
  const axiosSecure = useAxiosSecure();

  // Initialize request data
  const [request, setRequest] = useState({
    employee: {
      name: "Unknown User",
      email: "Unknown Email",
      image: "",
    },
    assetId: asset._id,
    productName: asset.productName,
    productType: asset.productType,
    hr: asset.hr?.email || "No HR Email",
    status: "Pending",
    notes: "", // Initialize notes as an empty string
    requestDate: "", // Initialize requestDate as an empty string
  });

  // Effect to update request data when user data is loaded
  useEffect(() => {
    if (user) {
      setRequest((prev) => ({
        ...prev,
        employee: {
          name: user?.displayName || "Unknown User",
          email: user?.email || "Unknown Email",
          image: user?.photoURL || "",
        },
      }));
    }
  }, [user]); // Re-run effect whenever user changes

  // Effect to set the requestDate to the current date
  useEffect(() => {
    if (isModalOpen) {
      setRequest((prev) => ({
        ...prev,
        requestDate: new Date().toISOString(), // Set the requestDate to the current date in ISO format
      }));
    }
  }, [isModalOpen]);

  // Modal toggle handle
  const handleRequestClick = () => setIsModalOpen(true);

  // Escape key listener for closing the modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Handle submitting the request with notes and requestDate
  const handleSubmitRequest = async () => {
    // Directly include the updated notes and requestDate in the request object
    const updatedRequest = { ...request, notes };

    try {
      const response = await axiosSecure.post("/request", updatedRequest);
      console.log("Request submitted successfully:", response.data);

      // Show SweetAlert success message
      Swal.fire({
        title: "Success!",
        text: "Your request has been submitted.",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      console.error("Error submitting request:", error);

      // Show SweetAlert error message
      Swal.fire({
        title: "Error!",
        text: "There was an issue submitting your request.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }

    // Reset modal state and notes
    setNotes("");
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 border-b">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Asset Name</th>
            <th className="border p-2">Asset Type</th>
            <th className="border p-2">Availability</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">{asset.productName}</td>
            <td className="border p-2">{asset.productType}</td>
            <td className="border p-2">
              {asset.productQuantity > 0 ? "Available" : "Out of Stock"}
            </td>
            <td className="border p-2">{asset.productQuantity}</td>
            <td className="border p-2">
              <button
                aria-label={asset.productQuantity > 0 ? "Request" : "Out of Stock"}
                className={`px-4 py-2 rounded text-white ${asset.productQuantity > 0 ? "bg-blue-500" : "bg-gray-500"}`}
                disabled={asset.productQuantity <= 0}
                onClick={handleRequestClick}
              >
                Request
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 id="modal-title" className="text-xl mb-4">Request Asset</h3>

            {/* Show asset details */}
            <div className="mb-4">
              <p><strong>Asset Name:</strong> {asset.productName}</p>
              <p><strong>Asset Type:</strong> {asset.productType}</p>
              <p><strong>Quantity:</strong> {asset.productQuantity}</p>
              {user && (
                <p><strong>User:</strong> {user.displayName}</p>
              )}
            </div>

            <textarea
              value={notes}
              name="note"
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes"
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSubmitRequest}
              >
                Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestTable;
