import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaUser, FaSignOutAlt, FaClipboardList, FaAsterisk } from 'react-icons/fa';
import useRole from '../Hooks/useRole';

// Sidebar Item Component
const SidebarItem = ({ to, icon: Icon, label }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? 'text-blue-500 font-bold flex items-center gap-2 p-2 rounded bg-gray-100'
          : 'flex items-center gap-2 p-2 rounded hover:bg-gray-200'
      }
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

  // Redirect if role is 'employ'
  useEffect(() => {
    if (!isLoading && role === 'employ') {
      navigate('/dashboard/emHome');
    }
    if (!isLoading && role === 'hr') {
      navigate('/dashboard/hr-home');
    }
  }, [role, isLoading, navigate]);

  // Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Toggle Button for Mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-full shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`lg:w-1/4 w-64 bg-base-200 p-4 h-full fixed lg:static z-40 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
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

          <div className="divider"></div>

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
          <SidebarItem to="/logout" icon={FaSignOutAlt} label="Logout" />
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
  );
};

export default DashBoard;
