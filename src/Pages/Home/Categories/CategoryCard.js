import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CategoryCard = ({ category }) => {
    const { img, _id } = category;

    useEffect(() => {
        AOS.init({ duration: 2500 });
    }, []);
    return (
        <div className='card shadow-md shadow-neutral' data-aos='zoom-in'>
            <figure className="px-10 pt-10">
                <Link to={`/category/${_id}`}><img src={img} alt="" /></Link>
            </figure>
        </div>
    );
};

export default CategoryCard;