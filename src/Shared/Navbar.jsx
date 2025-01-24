import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import logo from '../../src/assets/NavLogo/logo.jpg';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    // Detect scrolling and add/remove blur effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logOut();
        navigate('/login');  // Redirect to login after logging out
    }

    const links = (
        <>
            <li>
                <NavLink to="/" className={({ isActive }) => isActive ? "active-link text-teal-400" : "text-gray-300"}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active-link text-teal-400" : "text-gray-300"}>
                    DashBoard
                </NavLink>
            </li>
            {!user && (
                <>
                    <li>
                        <NavLink to="/join-employee" className={({ isActive }) => isActive ? "active-link text-teal-400" : "text-gray-300"}>
                            Join as Employee
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/join-hr" className={({ isActive }) => isActive ? "active-link text-teal-400" : "text-gray-300"}>
                            Join as HR Manager
                        </NavLink>
                    </li>
                </>
            )}
            {!user ? (
                <li>
                    <NavLink to="/login" className={({ isActive }) => isActive ? "active-link text-teal-400" : "text-gray-300"}>
                        Login
                    </NavLink>
                </li>
            ) : (
                <li>
                    <button onClick={handleLogout} className="btn btn-ghost text-orange-500 hover:bg-orange-100">
                        Logout
                    </button>
                </li>
            )}
        </>
    );

    return (
        <div className={`navbar max-w-screen-xl mx-auto sticky top-0 z-50 ${isScrolled ? 'bg-opacity-70 backdrop-blur-md' : ''}`} style={{ backgroundColor: '#2596be', color: 'white' }}>
            <div className="flex-1">
                <a className="btn btn-ghost text-xl text-white hover:bg-indigo-600">𝓜𝓪𝓷𝓰𝓮 𝓜𝓪𝓽𝓮</a>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User avatar"
                                src={user?.photoURL || logo} // Default image if no user photo
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white text-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
                    >
                        {links}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
