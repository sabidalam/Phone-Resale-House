import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loader from '../../../Components/Loader/Loader';
import { MdDeleteForever } from 'react-icons/md';

const AllReportedItems = () => {
    const { data: reportedItems = [], isLoading, refetch } = useQuery({
        queryKey: ['reportedItems'],
        queryFn: async () => {
            try {
                const res = await fetch('https://phone-resale-house-server.vercel.app/reportedItems', {
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
        const proceed = window.confirm('Are you sure you want to delete this report?');
        if (proceed) {
            fetch(`https://phone-resale-house-server.vercel.app/reportedItems/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        toast.success('Report Deleted Successfully');
                        refetch();
                    }
                })
        }
    }

    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div className='my-8 max-w-4xl mx-auto px-2'>
            <h3 className="text-2xl text-violet-300 font-bold mb-4">All Reported Items : {reportedItems.length}</h3>
            <div className="overflow-x-auto">
                <table className="w-full bg-secondary rounded-lg overflow-hidden">
                    <thead className='text-violet-200'>
                        <tr className='bg-primary'>
                            <th className='py-5'></th>
                            <th className='py-5'>Product Image</th>
                            <th className='py-5'>Product Name</th>
                            <th className='py-5'>Reporter Name</th>
                            <th className='py-5'>Report Reason</th>
                            <th className='py-5 pr-2'>Delete</th>
                        </tr>
                    </thead>
                    <tbody className='text-center text-white'>
                        {
                            reportedItems?.map((item, i) =>
                                <tr key={item._id} className='hover:bg-info rounded-xl cursor-pointer duration-300' style={{ 'border-top': '1px solid #231942' }}>
                                    <th className='px-4 py-5'>{i + 1}</th>
                                    <th className='py-3'>
                                        <div className="avatar">
                                            <div className="w-12">
                                                <img src={item.img} alt='' className='rounded-xl' />
                                            </div>
                                        </div>
                                    </th>
                                    <td className='px-2'>{item.productName}</td>
                                    <td className='px-2'>{item.userName}</td>
                                    <td className='px-2'>{item.reason}</td>
                                    <td className='px-2'><button onClick={() => handleDelete(item._id)} className='border-0'><MdDeleteForever className='text-red-500' size={30} /></button></td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllReportedItems;