import React, { useContext } from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const DisplayError = () => {
    const { logOut } = useContext(AuthContext);
    const error = useRouteError();
    const navigate = useNavigate();
    const handleSignOut = () => {
        logOut()
            .then(() => {
                navigate('/login');
            })
            .catch((error) => console.error(error));
    }
    return (
        <div>
            <p className='text-xl text-error'>Something went wrong</p>
            <p className='text-xl text-error'>{error.statusText || error.message}</p>
            <p>Please <Link to='/login'><button onClick={handleSignOut} className='btn btn-sm btn-primary'>SignOut</button></Link> and login again.</p>
        </div>
    );
};

export default DisplayError;