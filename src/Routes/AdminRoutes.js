import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Components/Loader/Loader';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import useAdmin from '../Hooks/useAdmin';


const AdminRoutes = ({ children }) => {
    const { user, loader } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();
    if (user && isAdmin) {
        return children;
    }
    if (loader || isAdminLoading) {
        return <Loader></Loader>
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};


export default AdminRoutes;