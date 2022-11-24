import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from './ProductCard';

const Category = () => {
    const products = useLoaderData();
    return (
        <div className='my-10'>
            <h3 className='text-accent text-2xl text-center font-bold mb-5'>All Available Products</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-5/6 mx-auto'>
                {
                    products.map(product => <ProductCard
                        key={product._id}
                        product={product}>
                    </ProductCard>)
                }
            </div>
        </div>
    );
};

export default Category;