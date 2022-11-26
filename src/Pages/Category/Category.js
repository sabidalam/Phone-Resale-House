import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import BookingModal from './BookingModal/BookingModal';
import ProductCard from './ProductCard';

const Category = () => {
    const { loader } = useContext(AuthContext);
    const [item, setItem] = useState(null);
    const products = useLoaderData();

    if (loader) {
        return <Loader></Loader>
    }

    return (
        <div className='my-10'>
            <h3 className='text-accent text-2xl text-center font-bold mb-5'>All Available Products</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-5/6 mx-auto'>
                {
                    products.map(product => <ProductCard
                        key={product._id}
                        product={product}
                        setItem={setItem}>
                    </ProductCard>)
                }
            </div>
            {
                item &&
                <BookingModal
                    item={item}
                    setItem={setItem}>
                </BookingModal>
            }
        </div>
    );
};

export default Category;