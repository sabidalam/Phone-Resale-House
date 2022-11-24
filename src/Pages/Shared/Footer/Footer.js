import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='bg-secondary'>
            <footer className="footer p-10 text-white max-w-6xl mx-auto lg:ml-24">
                <div>
                    <span className="footer-title text-accent">Services</span>
                    <Link className="link link-hover">Selling</Link>
                    <Link className="link link-hover">Buying</Link>
                    <Link className="link link-hover">Marketing</Link>
                    <Link className="link link-hover">Advertisement</Link>
                </div>
                <div>
                    <span className="footer-title text-accent">RESALE PHONE</span>
                    <Link className="link link-hover">Home</Link>
                    <Link className="link link-hover">Products</Link>
                    <Link className="link link-hover">About Us</Link>
                    <Link className="link link-hover">Contact</Link>
                </div>
                <div>
                    <span className="footer-title text-accent">ONLINE SHOPPING SERVICE</span>
                    <h1 className=''>Sell and Buy Phones</h1>
                </div>
            </footer>
            <div className='text-center text-white pb-4'>
                <p>Copyright © 2022 - All right reserved by Phone Resale House</p>
            </div>
        </div>
    );
};

export default Footer;