import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Components/Loader/Loader';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import useBuyer from '../Hooks/useBuyer';

const BuyerRoutes = ({ children }) => {
    const { user, loader } = useContext(AuthContext);
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
    const location = useLocation();
    if (user && isBuyer) {
        return children;
    }
    if (loader || isBuyerLoading) {
        return <Loader></Loader>
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default BuyerRoutes;