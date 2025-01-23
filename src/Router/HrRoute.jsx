import { Navigate } from "react-router-dom";
import useRole from "../Hooks/useRole";



const HrRoute = ({children}) => {
    const [role,isLoading]=useRole()
    

    // Show loading indicator if the authentication status is still being fetched
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    // If the user is authenticated, render the children (protected components)
    if (role==='hr') {
        return children;
    }

    // If not authenticated, redirect to login page
    return <Navigate to="/dashboard"  replace='true' />;
};



export default HrRoute;