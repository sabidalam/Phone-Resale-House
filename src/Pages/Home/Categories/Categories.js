import React from 'react';
import image1 from '../../../assets/categories/apple.webp';
import image2 from '../../../assets/categories/samsung-logo.webp';
import image3 from '../../../assets/categories/OPPO_LOGO.jpg';
import CategoryCard from './CategoryCard';


const Categories = () => {
    const categories = [
        {
            id: 1,
            image: image1,
            name: 'apple'
        },
        {
            id: 2,
            image: image2,
            name: 'samsung'
        },
        {
            id: 3,
            image: image3,
            name: 'oppo'
        },
    ]
    return (
        <div className='my-20'>
            <h3 className='text-accent text-2xl text-center font-bold mb-5'>Smartphone Brands Categories</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-5/6 mx-auto'>
                {
                    categories.map(category => <CategoryCard
                        key={category.id}
                        category={category}>
                    </CategoryCard>)
                }
            </div>
        </div>
    );
};

export default Categories;