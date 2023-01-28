import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import Loader from '../../../Components/Loader/Loader';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import { MdDeleteForever } from 'react-icons/md';
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton';

const MyProducts = () => {
    const { user, logOut } = useContext(AuthContext);

    const url = `https://phone-resale-house-server.vercel.app/products?email=${user?.email}`;

    const { data: products = [], isLoading, refetch } = useQuery({
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
    });
    console.log(products);

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure you want to delete this product?');
        if (proceed) {
            fetch(`https://phone-resale-house-server.vercel.app/products/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        toast.success('Deleted Successfully');
                        refetch();
                    }
                })
        }
    };

    const handleAdvertise = id => {
        fetch(`https://phone-resale-house-server.vercel.app/products/advertise/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Advertise Successful');
                }
            })

    }

    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div className='my-8 max-w-4xl mx-auto px-2'>
            <h3 className="text-2xl text-violet-300 font-bold mb-4">My Products: {products.length}</h3>
            <div className="overflow-x-auto">
                <table className="w-full bg-secondary rounded-lg overflow-hidden">
                    <thead className='text-violet-200'>
                        <tr className='bg-primary'>
                            <th className='py-5'></th>
                            <th className='py-5'>Product-Name</th>
                            <th className='py-5'>Price</th>
                            <th className='py-5'>Sales-status</th>
                            <th className='py-5'>Advertise</th>
                            <th className='py-5 pr-2'>Delete</th>
                        </tr>
                    </thead>
                    <tbody className='text-center text-white'>
                        {
                            products &&
                            products.map((product, i) =>
                                <tr key={product._id} className='hover:bg-info hover:scale-105 rounded-xl duration-300' style={{ 'border-top': '1px solid #231942' }}>
                                    <th className='pl-4 py-5'>{i + 1}</th>
                                    <td className='pl-2'>{product.name}</td>
                                    <td className='px-2'>${product.resalePrice}</td>
                                    <td className='px-2'>
                                        {
                                            product?.booked ?
                                                <span className='text-white font-bold'>Sold</span>
                                                :
                                                <span className='text-white font-bold'>Available</span>
                                        }
                                    </td>
                                    {
                                        product?.advertise ?
                                            <td className='px-2 text-primary font-bold'>Advertised</td>
                                            :
                                            <td className='px-2'><button onClick={() => handleAdvertise(product._id)} disabled><PrimaryButton classes={'btn-sm normal-case'}>Advertise</PrimaryButton></button></td>
                                    }
                                    <td className='px-2'><button onClick={() => handleDelete(product._id)} className='border-0'><MdDeleteForever className='text-red-500' size={30} /></button></td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyProducts;