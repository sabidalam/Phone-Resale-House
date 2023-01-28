import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loader from '../../../Components/Loader/Loader';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise);

const Payment = () => {
    const booking = useLoaderData();
    const navigation = useNavigation();
    const { productName, price } = booking;
    if (navigation.state === 'loading') {
        return <Loader></Loader>
    };
    return (
        <div className='mt-8 max-w-4xl mx-auto'>
            <h3 className="text-3xl text-violet-300 font-bold my-4">Payment for {productName}</h3>
            <p className='text-xl text-white'>Please pay <strong className='text-neutral'>${price}</strong> for your booking</p>
            <div className='w-96 my-12 border-white border-2 rounded-xl px-4 py-8'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm
                        booking={booking} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;