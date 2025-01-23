import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut();
        navigate('/login');  // Redirect to login after logging out
    }

    const links = (
        <>
            <li>
                <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active-link" : ""}>
                    DashBoard
                </NavLink>
            </li>
            {/* Show Join as Employee and Join as HR Manager only if user is not logged in */}
            {!user && (
                <>
                    <li>
                        <NavLink to="/join-employee" className={({ isActive }) => isActive ? "active-link" : ""}>
                            Join as Employee
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/join-hr" className={({ isActive }) => isActive ? "active-link" : ""}>
                            Join as HR Manager
                        </NavLink>
                    </li>
                </>
            )}
            {/* If user is not logged in, show Login link */}
            {!user ? (
                <li>
                    <NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : ""}>
                        Login
                    </NavLink>
                </li>
            ) : (
                // If user is logged in, show Logout link
                <li>
                    <button onClick={handleLogout} className="btn btn-ghost">
                        Logout
                    </button>
                </li>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User avatar"
                                src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} // Default image if no user photo
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
