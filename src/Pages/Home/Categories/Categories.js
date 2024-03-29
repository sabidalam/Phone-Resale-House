import React, { useEffect, useState } from 'react';
import Loader from '../../../Components/Loader/Loader';
import CategoryCard from './CategoryCard';


const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('https://phone-resale-house-server.vercel.app/allCategories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);



    if (loading) {
        return <Loader></Loader>
    };


    return (
        <div className='mt-10 mb-16'>
            <h3 className='text-violet-300 text-3xl text-center font-bold mb-10'>All Smartphone Brands</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-sm lg:max-w-4xl mx-auto'>
                {
                    categories.map(category => <CategoryCard
                        key={category._id}
                        category={category}>
                    </CategoryCard>)
                }
            </div>
        </div>
    );
};

export default Categories;