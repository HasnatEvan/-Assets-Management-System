import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import EmSignUp from "../Pages/EmSignUp/EmSignUp";
import HrSignUp from "../Pages/HrSignUp/HrSignUp";
import Dashboard from "../Layout/Dashboard";
import Profile from "../Pages/Dashboard/Profile/Profile";
import AddAnAssets from "../Pages/Dashboard/AddAnAssets/AddAnAssets";
import RequestForAsset from "../Pages/Dashboard/RequestForAsset/RequestForAsset";
import MyAssets from "../Pages/Dashboard/MyAssets/MyAssets";
import PrivateRoute from "./PrivateRoute";
import HrRoute from "./HrRoute";
import DashBoard from "../Layout/Dashboard";
import AssetsList from "../Pages/Dashboard/AssetsList/AssetsList";
import AddAnEmploy from "../Pages/Dashboard/AddAnEmploy/AddAnEmploy";
import Update from "../Pages/Dashboard/AssetsList/Update";
import AllRequest from "../Pages/Dashboard/AllRequest/AllRequest";
import MyEmploy from "../Pages/Dashboard/MyEmployList/MyEmploy";
import MyTeam from "../Pages/Dashboard/MyTeam/MyTeam";
import EmployHome from "../Pages/EmployHome/EmployHome";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },

            {
                path: '/join-employee',
                element: <EmSignUp></EmSignUp>
            },
            {
                path: '/join-hr',
                element: <HrSignUp></HrSignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
            // Hr
            {
                path: 'asset-list',
                element: <PrivateRoute>
                    <HrRoute><AssetsList></AssetsList></HrRoute>
                </PrivateRoute>
            },
            {
                path: 'updatedItem/:id',
                element: <PrivateRoute>
                    <HrRoute><Update></Update></HrRoute>
                </PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/assets/${params.id}`)
            },
            {
                path: 'addAssets',
                element: <PrivateRoute>
                    <HrRoute>  <AddAnAssets></AddAnAssets></HrRoute>
                </PrivateRoute>
            },
            {
                path: 'add-employee',
                element: <PrivateRoute>
                    <HrRoute>  <AddAnEmploy></AddAnEmploy>  </HrRoute>
                </PrivateRoute>
            },
            {
                path: 'all-requests',
                element: <PrivateRoute>
                    <HrRoute><AllRequest></AllRequest></HrRoute>
                </PrivateRoute>
            },
            {
                path: 'employee-list',
                element: <PrivateRoute>
                    <MyEmploy></MyEmploy>
                </PrivateRoute>
            },















            // Employ
            
            {
                path: 'emHome',
                element:<EmployHome></EmployHome>
            },
            {
                path: 'my-assets',
                element: <MyAssets></MyAssets>
            },
            {
                path: 'my-team',
                element: <MyTeam></MyTeam>
            },
            {
                path: 'request-asset',
                element: <RequestForAsset></RequestForAsset>
            },



















            // All user
            {
                path: 'Profile',
                element: <Profile></Profile>
            },
        ]




    }
]);