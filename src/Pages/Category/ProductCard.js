import React from 'react';
import PrimaryButton from '../../Components/PrimaryButton/PrimaryButton';

const ProductCard = ({ product }) => {
    const { img, brand, name, originalPrice, resalePrice, location, sellerName, usedTime, selling_post_date } = product;
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body">
                <p>Name: {name}</p>
                <p>Brand: {brand}</p>
                <p>Original-Price: {originalPrice}</p>
                <p>Resale-Price: {resalePrice}</p>
                <p>Used-Time: {usedTime}</p>
                <h2 className='font-bold divider'>Seller Information</h2>
                <p>Seller-Name: {sellerName}</p>
                <p>Location: {location}</p>
                <p>Posting-Date: {selling_post_date}</p>
                <div className="text-center mt-3">
                    <PrimaryButton>Book Now</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;