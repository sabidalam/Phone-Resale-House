import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Components/Loader/Loader';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import useSeller from '../Hooks/useSeller';

const SellerRoutes = ({ children }) => {
    const { user, loader } = useContext(AuthContext);
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    const location = useLocation();
    if (user && isSeller) {
        return children;
    }
    if (loader || isSellerLoading) {
        return <Loader></Loader>
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default SellerRoutes;