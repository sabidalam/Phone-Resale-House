import React from 'react';

const AdvertisedCard = ({ product }) => {
    const { img, brand, name, originalPrice, resalePrice, usedTime, productCondition } = product;
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
            </div>
        </div>
    );
};

export default AdvertisedCard;