import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loader from '../../../Components/Loader/Loader';
import { MdVerifiedUser } from 'react-icons/md';
import { FaUserTimes } from 'react-icons/fa';

const AllSellers = () => {
    const { data: sellers = [], isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            try {
                const res = await fetch('https://phone-resale-house-server.vercel.app/users/sellers', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.log(error);
            }
        }
    })

    const handleMakeVerified = id => {
        fetch(`https://phone-resale-house-server.vercel.app/users/seller/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Seller is Verified Now');
                    refetch();
                }
            })
    }

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure you want to delete this seller?');
        if (proceed) {
            fetch(`https://phone-resale-house-server.vercel.app/users/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        toast.success('Seller Deleted Successfully');
                        refetch();
                    }
                })
        }
    };

    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div className='my-8 max-w-4xl mx-auto px-2'>
            <h3 className="text-2xl text-violet-300 font-bold mb-4">All Sellers : {sellers.length}</h3>
            <div className="overflow-x-auto">
                <table className="w-full bg-secondary rounded-lg overflow-hidden">
                    <thead className='text-violet-200'>
                        <tr className='bg-primary'>
                            <th className='py-5'></th>
                            <th className='py-5'>Name</th>
                            <th className='py-5'>Email</th>
                            <th className='py-5'>Status</th>
                            <th className='py-5'>Verify</th>
                            <th className='py-5 pr-2'>Delete</th>
                        </tr>
                    </thead>
                    <tbody className='text-center text-white'>
                        {
                            sellers?.map((seller, i) =>
                                <tr key={seller._id} className='hover:bg-info rounded-xl cursor-pointer duration-300' style={{ 'border-top': '1px solid #231942' }}>
                                    <th className='p-5'>{i + 1}</th>
                                    <td className='py-4'>{seller.name}</td>
                                    <td className='px-2'>{seller.email}</td>
                                    <td className='px-2'>
                                        {
                                            seller?.status ?
                                                <p className='flex items-center'>
                                                    {seller.status} <MdVerifiedUser className='text-blue-600 ml-1'></MdVerifiedUser>
                                                </p>
                                                :
                                                'Not verified'
                                        }
                                    </td>
                                    <td className='px-2'>
                                        {
                                            seller.status !== 'verified' &&
                                            <button onClick={() => handleMakeVerified(seller._id)} className='btn btn-sm btn-primary'>Make Verified</button>
                                        }
                                    </td>
                                    <td className='px-2'><button onClick={() => handleDelete(seller._id)} className='border-0'><FaUserTimes className='text-red-500' size={25} /></button></td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllSellers;