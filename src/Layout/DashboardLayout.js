import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import useBuyer from '../Hooks/useBuyer';
import useSeller from '../Hooks/useSeller';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);
    const [isBuyer] = useBuyer(user?.email);
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        {
                            isBuyer &&
                            <li className='font-bold bg-gray-100 rounded-lg'><Link to='/dashboard/myOrders'>My Orders</Link></li>
                        }
                        {
                            isSeller &&
                            <>
                                <li className='font-bold bg-gray-100 rounded-lg mb-3'><Link to='/dashboard/addProduct'>Add A Product</Link></li>
                                <li className='font-bold bg-gray-100 rounded-lg'><Link to='/dashboard/myProducts'>My Products</Link></li>
                            </>
                        }
                        {
                            isAdmin &&
                            <>
                                <li className='font-bold bg-gray-100 rounded-lg mb-3'><Link to='/dashboard/allBuyers'>All Buyers</Link></li>
                                <li className='font-bold bg-gray-100 rounded-lg mb-3'><Link to='/dashboard/allSellers'>All Sellers</Link></li>
                                <li className='font-bold bg-gray-100 rounded-lg'><Link to='/dashboard/reportedItems'>Reported Items</Link></li>
                            </>
                        }

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;