import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    const { img, _id } = category;
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <Link to={`/category/${_id}`}><img src={img} alt="" /></Link>
            </figure>
        </div>
    );
};

export default CategoryCard;