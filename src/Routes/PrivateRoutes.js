import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Components/Loader/Loader';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';

const PrivateRoutes = ({ children }) => {
    const { user, loader } = useContext(AuthContext);
    const location = useLocation();
    if (user) {
        return children;
    }
    if (loader) {
        return <Loader></Loader>
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoutes;