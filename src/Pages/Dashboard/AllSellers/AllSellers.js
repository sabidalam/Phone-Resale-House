import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllSellers = () => {
    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users/sellers')
            const data = await res.json();
            return data;
        }
    })

    const handleMakeAdmin = id => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Make admin successful');
                    refetch();
                }
            })

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
                            <th>Type</th>
                            <th>Admin</th>
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
                                    <td>{seller.accountType}</td>
                                    <td>
                                        {
                                            seller?.role !== 'admin' &&
                                            <button onClick={() => handleMakeAdmin(seller._id)} className='btn btn-sm btn-primary'>Make-Admin</button>
                                        }
                                    </td>
                                    <td><button className='btn btn-sm btn-error'>Delete</button></td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllSellers;