import React from 'react';
import { MdVerifiedUser } from 'react-icons/md';

const ProductCard = ({ product, setItem }) => {
    const { img, brand, name, originalPrice, resalePrice, location, sellerName, usedTime, selling_post_date, productCondition, phone, } = product;
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body">
                <p>Name: {name}</p>
                <p>Brand: {brand}</p>
                <p>Original-Price: ${originalPrice}</p>
                <p>Resale-Price: ${resalePrice}</p>
                <p>Year-of-Use: {usedTime}</p>
                <p>Product-Condition: {productCondition}</p>
                <h2 className='font-bold divider'>Seller Information</h2>
                <p className='flex items-center'>
                    Seller-Name: {sellerName}
                    <span>
                        {
                            product.verified &&
                            <MdVerifiedUser className='text-blue-600 ml-1 mt-1'></MdVerifiedUser>
                        }
                    </span>
                </p>
                <p>Phone: {phone}</p>
                <p>Location: {location}</p>
                <p>Posting-Date: {selling_post_date}</p>
                <div className='flex justify-between items-center'>
                    <div className="mt-3">
                        <label
                            onClick={() => setItem(product)}
                            htmlFor="booking-modal"
                            className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">
                            Book Now
                        </label>
                    </div>
                    <div className="mt-3">
                        <label
                            onClick={() => setItem(product)}
                            htmlFor="reportedModal"
                            className="btn btn-info text-white">
                            Report To Admin
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;