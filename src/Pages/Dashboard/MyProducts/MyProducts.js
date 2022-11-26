import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Loader from '../../../Components/Loader/Loader';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const MyProducts = () => {
    const { user, logOut } = useContext(AuthContext);

    const url = `http://localhost:5000/products?email=${user?.email}`;

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products', user?.email],
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
        <div>
            <h3 className="text-xl font-bold mb-4">My Products</h3>
            <div className="overflow-x-auto">
                <table className="table w-11/12">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product-Name</th>
                            <th>Price</th>
                            <th>Sales-status</th>
                            <th>Advertise</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products &&
                            products.map((product, i) =>
                                <tr key={product._id}>
                                    <th>{i + 1}</th>
                                    <td>{product.name}</td>
                                    <td>${product.resalePrice}</td>
                                    <td>
                                        {
                                            <button className='btn btn-sm btn-success'>Available</button>
                                        }
                                    </td>
                                    <td><button className='btn btn-sm btn-info'>Advertise</button></td>
                                    <td><button className='btn btn-sm btn-error'>Delete</button></td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyProducts;