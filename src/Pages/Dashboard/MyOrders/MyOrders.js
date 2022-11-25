import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Loader from '../../../Components/Loader/Loader';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const MyOrders = () => {
    const { user, logOut } = useContext(AuthContext);

    const url = `http://localhost:5000/bookings?email=${user?.email}`;

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
        <div className='my-3'>
            <h3 className="text-xl font-bold mb-4">My Orders</h3>
            <div className="overflow-x-auto">
                <table className="table w-11/12">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product-Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings &&
                            bookings.map((booking, i) =>
                                <tr key={booking._id}>
                                    <th>{i + 1}</th>
                                    <td>{booking.productName}</td>
                                    <td>{booking.brand}</td>
                                    <td>${booking.price}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyOrders;