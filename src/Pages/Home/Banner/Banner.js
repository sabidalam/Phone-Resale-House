import React from 'react';
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton';
import image1 from '../../../assets/banner/bg1.png';
import image2 from '../../../assets/banner/bg2.png';
import image3 from '../../../assets/banner/bg3.png';

const Banner = () => {
    return (
        <div className="hero my-8 py-4">
            <div className="hero-content max-w-6xl flex-col lg:flex-row-reverse">
                <div className="carousel w-full">
                    <div id="slide1" className="carousel-item relative w-full">
                        <img src={image1} className="w-full" alt='' />
                        <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide3" className="btn btn-sm btn-circle lg:mr-4">❮</a>
                            <a href="#slide2" className="btn btn-sm btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <img src={image2} className="w-full" alt='' />
                        <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide1" className="btn btn-sm btn-circle lg:mr-4">❮</a>
                            <a href="#slide3" className="btn btn-sm btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img src={image3} className="w-full" alt='' />
                        <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide2" className="btn btn-sm btn-circle lg:mr-4">❮</a>
                            <a href="#slide1" className="btn btn-sm btn-circle">❯</a>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="text-5xl font-bold">Resale Your Used Mobile Phone</h1>
                    <p className="py-6">Buy and sell used phone. We're confident that you'll find the best possible price for recycling your old mobile phone through phone resale house. </p>
                    <PrimaryButton>Get Started</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Banner;