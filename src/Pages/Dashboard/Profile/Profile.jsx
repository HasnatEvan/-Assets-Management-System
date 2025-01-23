import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const Profile = () => {
    const { user, updateUserProfile } = useAuth(); // `useAuth` থেকে user এবং updateUserProfile ডেটা আনুন
    const [newName, setNewName] = useState(user?.displayName || ""); // প্রাথমিক ইনপুট ভ্যালু

    const handleUpdateName = () => {
        const updatedData = { displayName: newName }; // আপডেট ডেটা তৈরি

        updateUserProfile(updatedData)
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Your name has been updated successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    window.location.reload(); // পেজ রিফ্রেশ করে নতুন নাম দেখানো
                });
            })
            .catch((error) => {
                console.error("Error updating name:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update name. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
                <div className="flex flex-col items-center">
                    {/* প্রোফাইল ছবি */}
                    <img
                        src={user?.photoURL || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full mb-4"
                    />
                    {/* নাম */}
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        {user?.displayName || "Anonymous User"}
                    </h2>
                    {/* ইমেইল */}
                    <p className="text-gray-600 mb-4">{user?.email || "Email not available"}</p>

                    {/* ইনপুট ফিল্ড */}
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded w-full mb-4"
                    />

                    {/* আপডেট বাটন */}
                    <button
                        onClick={handleUpdateName}
                        className="px-4 py-2 bg-blue-500 text-white rounded w-full"
                    >
                        Update Name
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
