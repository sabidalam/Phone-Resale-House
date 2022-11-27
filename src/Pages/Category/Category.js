import React, { useState } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import BookingModal from './BookingModal/BookingModal';
import ProductCard from './ProductCard';
import ReportedModal from './ReportedModal/ReportedModal';

const Category = () => {
    const [item, setItem] = useState({});
    const products = useLoaderData();
    const navigation = useNavigation();

    if (navigation.state === 'loading') {
        return <Loader></Loader>
    };
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
            <div>
                {
                    item &&
                    <ReportedModal
                        item={item}
                        setItem={setItem}>
                    </ReportedModal>
                }
            </div>
        </div>
    );
};

export default Category;