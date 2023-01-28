import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton';
import CategoryCard from './CategoryCard';

const CategoryHome = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('https://phone-resale-house-server.vercel.app/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])
    return (
        <div className='my-20'>
            <h3 className='text-violet-300 text-3xl text-center font-bold mb-10'>Smartphone Brands Categories</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-sm lg:max-w-4xl mx-auto'>
                {
                    categories.map(category => <CategoryCard
                        key={category._id}
                        category={category}>
                    </CategoryCard>)
                }
            </div>
            <div className='my-8 text-center'>
                <Link to='/categories'><PrimaryButton classes={'px-10'}>View All Brands</PrimaryButton></Link>
            </div>
        </div>
    );
};

export default CategoryHome;