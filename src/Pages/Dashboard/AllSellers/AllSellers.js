import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loader from '../../../Components/Loader/Loader';
import { MdVerifiedUser } from 'react-icons/md';

const AllSellers = () => {
    const { data: sellers = [], isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/users/sellers', {
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
        fetch(`http://localhost:5000/users/seller/${id}`, {
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
            fetch(`http://localhost:5000/users/${id}`, {
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
        <div className='mb-6'>
            <h3 className="text-xl font-bold mb-4">All Sellers</h3>
            <div className="overflow-x-auto">
                <table className="table table-normal w-11/12">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Verify</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers?.map((seller, i) =>
                                <tr key={seller._id}>
                                    <th>{i + 1}</th>
                                    <td>{seller.name}</td>
                                    <td>{seller.email}</td>
                                    <td>
                                        {
                                            seller?.status ?
                                                <p className='flex items-center'>
                                                    {seller.status} <MdVerifiedUser className='text-blue-600 ml-1 mt-1'></MdVerifiedUser>
                                                </p>
                                                :
                                                'unverified'
                                        }
                                    </td>
                                    <td>
                                        {
                                            seller.status !== 'verified' &&
                                            <button onClick={() => handleMakeVerified(seller._id)} className='btn btn-sm btn-primary'>Make Verified</button>
                                        }
                                    </td>
                                    <td><button onClick={() => handleDelete(seller._id)} className='btn btn-sm btn-error'>Delete</button></td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllSellers;