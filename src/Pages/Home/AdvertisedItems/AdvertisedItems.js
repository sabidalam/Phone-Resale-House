import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Loader from '../../../Components/Loader/Loader';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import AdvertisedCard from './AdvertisedCard';

const AdvertisedItems = () => {
    const { logOut } = useContext(AuthContext);
    const url = 'https://phone-resale-house-server.vercel.app/products/advertised';

    const { data: products = [], isLoading, } = useQuery({
        queryKey: ['products'],
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
    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div className='my-10'>
            <h3 className='text-violet-300 text-3xl text-center font-bold mb-10'>Advertised Items</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-5/6 mx-auto'>
                {
                    products.map(product => <AdvertisedCard
                        key={product._id}
                        product={product}>
                    </AdvertisedCard>)
                }
            </div>

        </div>
    );
};

export default AdvertisedItems;