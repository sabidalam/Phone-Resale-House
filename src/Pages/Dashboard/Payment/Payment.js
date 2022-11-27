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
        <div>
            <h3 className="text-3xl font-bold my-4">Payment for {productName}</h3>
            <p className='text-xl'>Please pay <strong className='text-secondary'>${price}</strong> for your booking</p>
            <div className='w-96 my-12 border-secondary border-2 rounded-xl px-4 py-8'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm
                        booking={booking} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;