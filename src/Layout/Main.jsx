import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('/payment'); // Check if the current path is '/payment'

    return (
        <div>
            {!noHeaderFooter && <Navbar />} {/* Conditionally render Navbar */}
            <Outlet />
            {!noHeaderFooter && <Footer />} {/* Conditionally render Footer */}
        </div>
    );
};

export default Main;
