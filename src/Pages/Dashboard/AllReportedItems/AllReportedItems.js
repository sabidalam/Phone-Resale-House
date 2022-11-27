import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loader from '../../../Components/Loader/Loader';

const AllReportedItems = () => {
    const { data: reportedItems = [], isLoading, refetch } = useQuery({
        queryKey: ['reportedItems'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/reportedItems', {
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
            fetch(`http://localhost:5000/reportedItems/${id}`, {
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
        <div>
            <h3 className="text-xl font-bold mb-4">All Buyers</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Reporter Name</th>
                            <th>Report Reason</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportedItems?.map((item, i) =>
                                <tr key={item._id}>
                                    <th>{i + 1}</th>
                                    <th>
                                        <div className="avatar">
                                            <div className="w-12">
                                                <img src={item.img} alt='' className='rounded-xl' />
                                            </div>
                                        </div>
                                    </th>
                                    <td>{item.productName}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.reason}</td>
                                    <td><button onClick={() => handleDelete(item._id)} className='btn btn-sm btn-error'>Delete</button></td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllReportedItems;