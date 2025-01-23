import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2"; // Import SweetAlert2

const AddEmployTable = ({ emUser }) => {
  const { name, email, dob, status, role } = emUser;
  const axiosSecure = useAxiosSecure();

  // Maintain state for users
  const [updatedUser, setUpdatedUser] = useState(emUser);

  // Handle approve action
  const handleApprove = async () => {
    try {
      // Sending the request to update the user role
      const response = await axiosSecure.patch(`/users/role/${email}`, {
        role: "employ", // Setting role to 'employ'
        status: "approved", // Updating status
      });

      if (response.status === 200) {
        console.log(`Employee ${name} has been approved and role changed to 'employ'.`);

        // Update the local state to reflect the changes
        setUpdatedUser({
          ...updatedUser,
          role: "employ",
          status: "approved",
        });

        // SweetAlert2 success popup
        Swal.fire({
          title: "Success!",
          text: `Employee ${name} has been approved.`,
          icon: "success",
          confirmButtonText: "Ok",
        });
      } else {
        console.error("Failed to approve the employee:", response.data.message);
        // SweetAlert2 error popup
        Swal.fire({
          title: "Error!",
          text: "Failed to approve the employee.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      // SweetAlert2 error popup for catch block
      Swal.fire({
        title: "Error!",
        text: "An error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <tr className="text-center border-b">
      <td className="px-4 py-2">{updatedUser.name}</td>
      <td className="px-4 py-2">{updatedUser.email}</td>
      <td className="px-4 py-2">{updatedUser.dob}</td>
      <td className="px-4 py-2">{updatedUser.role}</td>
      <td
        className={`px-4 py-2 ${
          updatedUser.status === "requested"
            ? "text-yellow-500"
            : updatedUser.status === "approved"
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {updatedUser.status || "Unavailable"}
      </td>
      <td className="px-4 py-2">
        {/* Approve Button */}
        <button
          onClick={handleApprove}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={updatedUser.status === "approved"}
        >
          {updatedUser.status === "approved" ? "Approved" : "Approve"}
        </button>
      </td>
    </tr>
  );
};

export default AddEmployTable;
