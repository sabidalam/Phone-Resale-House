import React, { useEffect } from 'react';
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton';
import image1 from '../../../assets/banner/bg4.png';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Banner = () => {

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    return (
        <div className="hero max-w-6xl mx-auto my-8 py-4">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='lg:w-1/2' data-aos='fade-up'>
                    <img src={image1} className='scale-110 hover:scale-125 duration-300 hover:animate-pulse aos-init cursor-pointer' alt="" />
                </div>
                <div className='lg:w-1/2' data-aos='fade-right'>
                    <h1 className="text-5xl font-bold text-violet-300">Resale Your Used Mobile Phone</h1>
                    <p className="py-6 text-white">Buy and sell used phone. We're confident that you'll find the best possible price for recycling your old mobile phone through phone resale house. </p>
                    <PrimaryButton>Get Started</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Banner;