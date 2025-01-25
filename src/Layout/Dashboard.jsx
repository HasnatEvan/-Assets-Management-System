import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaUser, FaSignOutAlt, FaClipboardList, FaAsterisk } from 'react-icons/fa';
import useRole from '../Hooks/useRole';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import { Helmet} from 'react-helmet-async';

// Sidebar Item Component
const SidebarItem = ({ to, icon: Icon, label, onClick }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? 'text-primary font-bold flex items-center gap-2 p-2 rounded bg-gray-100'
          : 'flex items-center gap-2 p-2 rounded hover:bg-gray-200'
      }
      onClick={onClick} // Trigger the click handler if provided
    >
      <Icon />
      {label}
    </NavLink>
  </li>
);

const DashBoard = () => {
  const [role, isLoading] = useRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  // Redirect based on role
  useEffect(() => {
    if (!isLoading && role === 'employ') {
      navigate('/dashboard/emHome');
    }
    if (!isLoading && role === 'hr') {
      navigate('/dashboard/hr-home');
    }
  }, [role, isLoading, navigate]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await logOut();
      Swal.fire({
        icon: 'success',
        title: 'Logged Out!',
        text: 'You have been successfully logged out.',
        confirmButtonText: 'Okay',
      });
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
      Swal.fire({
        icon: 'error',
        title: 'Logout Failed',
        text: 'Something went wrong. Please try again later.',
        confirmButtonText: 'Try Again',
      });
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (

    <div>
      <Helmet>
        <title>Manage Mate || Dashboard</title>
      </Helmet>
      <div className="flex h-screen">
        {/* Toggle Button for Mobile */}
        <button
          className="lg:hidden fixed top-4 left-4 z-50 bg-primary text-white p-2 rounded-full shadow-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {/* Sidebar */}
        <div
          className={`lg:w-1/4 w-64 bg-base-200 p-4 h-full fixed lg:static z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <ul className="menu text-base-content">
            {/* Admin Section */}
            {role === 'admin' && (
              <>
                <SidebarItem to="/" icon={FaHome} label="Manage User" />
                <SidebarItem to="/dashboard/asset-list" icon={FaClipboardList} label="Statistics" />
              </>
            )}

            {/* HR Section */}
            {role === 'hr' && (
              <>
                <SidebarItem to="/dashboard/hr-home" icon={FaHome} label="HR Home" />
                <SidebarItem to="/dashboard/asset-list" icon={FaClipboardList} label="Asset List" />
                <SidebarItem to="/dashboard/addAssets" icon={FaClipboardList} label="Add an Asset" />
                <SidebarItem to="/dashboard/all-requests" icon={FaAsterisk} label="All Requests" />
                <SidebarItem to="/dashboard/employee-list" icon={FaUser} label="My Employee List" />
                <SidebarItem to="/dashboard/add-employee" icon={FaUser} label="Add an Employee" />
              </>
            )}

            {/* Employee Section */}
            {role === 'employ' && (
              <>
                <SidebarItem to="/dashboard/emHome" icon={FaHome} label="Employee Home" />
                <SidebarItem to="/dashboard/my-assets" icon={FaClipboardList} label="My Assets" />
                <SidebarItem to="/dashboard/my-team" icon={FaUser} label="My Team" />
                <SidebarItem to="/dashboard/request-asset" icon={FaAsterisk} label="Request for an Asset" />
              </>
            )}

            <div className="divider"></div>

            {/* Shared Navigation */}
            <SidebarItem to="/" icon={FaUser} label="Home" />
            <SidebarItem to="/dashboard/profile" icon={FaUser} label="Profile" />
            <SidebarItem to="#" icon={FaSignOutAlt} label="Logout" onClick={handleLogout} />
          </ul>
        </div>

        {/* Dashboard Content */}
        <div
          className="flex-1 p-8 overflow-auto"
          onClick={() => isSidebarOpen && setIsSidebarOpen(false)} // Close sidebar on content click
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
