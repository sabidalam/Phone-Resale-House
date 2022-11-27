import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Category from "../Pages/Category/Category";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import DisplayError from "../Pages/Shared/DisplayError/DisplayError";
import SignUp from "../Pages/SignUp/SignUp";
import img from '../assets/404error.jpg';
import PrivateRoutes from "./PrivateRoutes";
import DashboardLayout from "../Layout/DashboardLayout";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import AllBuyers from "../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../Pages/Dashboard/AllSellers/AllSellers";
import AdminRoutes from "./AdminRoutes";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import MyProducts from "../Pages/Dashboard/MyProducts/MyProducts";
import SellerRoutes from "./SellerRoutes";
import BuyerRoutes from "./BuyerRoutes";
import Blog from "../Pages/Blog/Blog";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AllReportedItems from "../Pages/Dashboard/AllReportedItems/AllReportedItems";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/category/:id',
                element: <PrivateRoutes><Category></Category></PrivateRoutes>,
                loader: ({ params }) => fetch(`http://localhost:5000/categories/${params.id}`)
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/myOrders',
                element: <BuyerRoutes><MyOrders></MyOrders></BuyerRoutes>
            },
            {
                path: '/dashboard/allBuyers',
                element: <AdminRoutes><AllBuyers></AllBuyers></AdminRoutes>
            },
            {
                path: '/dashboard/allSellers',
                element: <AdminRoutes><AllSellers></AllSellers></AdminRoutes>
            },
            {
                path: '/dashboard/reportedItems',
                element: <AdminRoutes><AllReportedItems></AllReportedItems></AdminRoutes>
            },
            {
                path: '/dashboard/addProduct',
                element: <SellerRoutes><AddProduct></AddProduct></SellerRoutes>
            },
            {
                path: '/dashboard/myProducts',
                element: <SellerRoutes><MyProducts></MyProducts></SellerRoutes>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`http://localhost:5000/booking/${params.id}`)
            },
        ]
    },
    {
        path: '*',
        element:
            <div className="text-center">
                <img src={img} alt="" className="w-1/2 mx-auto" />
                <h3 className='text-3xl'>The route you are searching is not available!!!</h3>
                <h3 className='text-3xl'>Please try for a valid route!!!</h3>
            </div>
    }
])

export default router;