import React, { useEffect } from 'react';
import { MdVerifiedUser } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProductCard = ({ product, setItem }) => {
    const { img, brand, name, originalPrice, resalePrice, location, sellerName, usedTime, selling_post_date, productCondition, phone, } = product;

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);
    return (
        <div className="card bg-secondary text-white shadow-xl" data-aos='flip-left'>
            <figure className="">
                <img src={img} alt="Shoes" className="rounded-xl-t" />
            </figure>
            <div className="card-body">
                <p>Name: {name}</p>
                <p>Brand: {brand}</p>
                <p>Original-Price: ${originalPrice}</p>
                <p>Resale-Price: ${resalePrice}</p>
                <p>Year-of-Use: {usedTime}</p>
                <p>Product-Condition: {productCondition}</p>
                <h2 className='font-bold divider text-primary'>Seller Information</h2>
                <p className='flex items-center'>
                    Seller-Name: {sellerName}
                    <span>
                        {
                            product.verified &&
                            <MdVerifiedUser className='text-blue-600 ml-1'></MdVerifiedUser>
                        }
                    </span>
                </p>
                <p>Phone: {phone}</p>
                <p>Location: {location}</p>
                <p>Posting-Date: {selling_post_date}</p>
                <div className='flex justify-between items-center'>
                    {
                        product?.booked ?
                            <span className='mt-2 text-white font-semibold bg-primary p-3 rounded-full'> Booked</span>
                            :
                            <div className="mt-3">
                                <label
                                    onClick={() => setItem(product)}
                                    htmlFor="booking-modal"
                                    className="btn btn-sm btn-primary normal-case bg-gradient-to-r from-primary via-secondary to-accent text-white">
                                    Book Now
                                </label>
                            </div>
                    }
                    <div className="mt-3 ">
                        <label
                            onClick={() => setItem(product)}
                            htmlFor="reportedModal"
                            className="btn btn-sm btn-accent normal-case text-white">
                            Report To Admin
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;