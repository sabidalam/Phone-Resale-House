import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton';
import { Link } from 'react-router-dom';

const AdvertisedCard = ({ product }) => {
    const { id, img, name, resalePrice } = product;

    useEffect(() => {
        AOS.init({ duration: 2500 });
    }, []);

    return (
        <div>
            {
                !product.booked &&
                <div className="card card-side shadow-xl bg-secondary text-white" data-aos='flip-down'>
                    <figure className='w-10/12' data-aos='zoom-in-right'>
                        <img src={img} className='h-60' alt="" />
                    </figure>
                    <div className="card-body w-36">
                        <h2 className="font-semibold text-primary">{name}</h2>
                        <p className='animate-bounce aos-init mt-3'>Best Price ${resalePrice}</p>
                        <div className="card-actions justify-end">
                            <Link to={`/category/${id}`}><PrimaryButton classes={'normal-case btn-sm'}>View</PrimaryButton></Link>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default AdvertisedCard;