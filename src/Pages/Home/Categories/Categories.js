import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';


const Categories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])

    return (
        <div className='my-20'>
            <h3 className='text-accent text-2xl text-center font-bold mb-5'>Smartphone Brands Categories</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-5/6 mx-auto'>
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