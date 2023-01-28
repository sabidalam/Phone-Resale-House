import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../Components/Loader/Loader';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const MyOrders = () => {
    const { user, logOut } = useContext(AuthContext);

    const url = `https://phone-resale-house-server.vercel.app/bookings?email=${user?.email}`;

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            if (res.status === 401 || res.status === 403) {
                return logOut();
            }
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div className='my-8 max-w-4xl mx-auto px-2'>
            <h3 className="text-2xl text-violet-300 font-bold mb-4">My Orders</h3>
            <div className="overflow-x-auto">
                <table className=" lg:w-11/12 bg-secondary rounded-lg overflow-hidden">
                    <thead className='text-violet-200'>
                        <tr className='bg-primary'>
                            <th className='py-5'></th>
                            <th className='py-5'>image</th>
                            <th className='py-5 px-2'>Product-Name</th>
                            <th className='py-5'>Brand</th>
                            <th className='py-5'>Price</th>
                            <th className='py-5 pr-2'>Payment</th>
                        </tr>
                    </thead>
                    <tbody className='text-center text-white'>
                        {
                            bookings &&
                            bookings.map((booking, i) =>
                                <tr key={booking._id} className='hover:bg-info hover:scale-105 rounded-xl cursor-pointer duration-300' style={{ 'border-top': '1px solid #231942' }}>
                                    <th className='px-4'>{i + 1}</th>
                                    <td className='py-3'>
                                        <div className="avatar">
                                            <div className="w-12">
                                                <img src={booking.img} alt='' className='rounded-xl' />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-2'>{booking.productName}</td>
                                    <td className='px-2'>{booking.brand}</td>
                                    <td className='px-2'>${booking.price}</td>
                                    <td>
                                        {
                                            booking.price && !booking.paid &&
                                            <Link to={`/dashboard/payment/${booking._id}`}>
                                                <button className='btn btn-primary text-white btn-sm'>Pay</button>
                                            </Link>
                                        }
                                        {
                                            booking.price && booking.paid &&
                                            <span className='text-secondary'>Paid</span>
                                        }
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyOrders;