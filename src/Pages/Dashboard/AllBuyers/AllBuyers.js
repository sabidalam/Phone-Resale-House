import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loader from '../../../Components/Loader/Loader';
import { FaUserTimes } from 'react-icons/fa';

const AllBuyers = () => {
    const { data: buyers = [], isLoading, refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            try {
                const res = await fetch('https://phone-resale-house-server.vercel.app/users/buyers', {
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
    });

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure you want to delete this buyer?');
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
                        toast.success('Buyer Deleted Successfully');
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
            <h3 className="text-2xl text-violet-300 font-bold mb-4">All Buyers : {buyers.length}</h3>
            <div className="overflow-x-auto">
                <table className="w-full bg-secondary rounded-lg overflow-hidden">
                    <thead className='text-violet-200'>
                        <tr className='bg-primary'>
                            <th className='py-5'></th>
                            <th className='py-5'>Name</th>
                            <th className='py-5'>Email</th>
                            <th className='py-5 pr-2'>Delete</th>
                        </tr>
                    </thead>
                    <tbody className='text-center text-white'>
                        {
                            buyers?.map((buyer, i) =>
                                <tr key={buyer._id} className='hover:bg-info rounded-xl cursor-pointer duration-300' style={{ 'border-top': '1px solid #231942' }}>
                                    <th className='px-4 py-5'>{i + 1}</th>
                                    <td className='px-2'>{buyer.name}</td>
                                    <td className='px-2'>{buyer.email}</td>
                                    <td className='px-2'><button onClick={() => handleDelete(buyer._id)} className='border-0'><FaUserTimes className='text-red-500' size={25} /></button></td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllBuyers;