import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import logo from '../../../assets/logo.png';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleSingOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))

    }
    const navbar = <>
        <li className='font-semibold text-white'><Link to='/'>Home</Link></li>
        <li className='font-semibold text-white'><Link to='/categories'>Categories</Link></li>

        {
            user?.uid &&
            <>
                <li className="font-semibold text-white"><Link to='/dashboard'>Dashboard</Link></li>
            </>
        }
        <li className="font-semibold text-white"> <Link to='/blog'>Blog</Link></li>
        <li className="font-semibold text-white"> <Link to='/contact'>Contact Us</Link></li>

    </>
    return (
        <div className='bg-gradient-to-r from-primary vai-secondary to-accent sticky top-0 z-30'>
            <div className="max-w-5xl mx-auto navbar py-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost text-white lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary rounded-box w-52">
                            {navbar}
                        </ul>
                    </div>
                    <Link to='/'><img src={logo} alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex ml-6">
                    <ul className="menu menu-horizontal p-0">
                        {navbar}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user?.email ?
                            <>
                                <Link to=''>
                                    {
                                        user?.photoURL ?
                                            <img
                                                className='mr-3 rounded-full'
                                                src={user?.photoURL}
                                                style={{ height: '30px' }}
                                                alt=''>
                                            </img>
                                            :
                                            <FaUser className='mr-3'></FaUser>
                                    }
                                </Link>
                                <button onClick={handleSingOut} className='btn btn-sm btn-primary bg-gradient-to-r from-secondary vai-accent to-info text-white'><Link to='/login'>SignOut</Link></button>
                            </>

                            :
                            <>
                                <Link to='/login' className='font-semibold text-white mr-7'>Login</Link>
                                <Link to='/signUp' className='font-semibold text-white'>SignUp</Link>
                            </>
                    }
                </div>
                <label htmlFor="dashboard-drawer" tabIndex={1} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;