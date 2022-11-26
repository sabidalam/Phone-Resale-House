import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const BookingModal = ({ item, setItem, refetch }) => {
    const { user } = useContext(AuthContext);
    const { _id, name, id, resalePrice, brand } = item;

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const userName = form.userName.value;
        const email = form.email.value;
        const productName = form.productName.value;
        const price = form.price.value;
        const phone = form.phone.value;
        const location = form.location.value;

        const booking = {
            userName: userName,
            email: email,
            productName: productName,
            productID: _id,
            id: id,
            brand,
            price: price,
            phone: phone,
            location: location
        }
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    setItem(null);
                    toast.success('Booking Confirmed');
                }
                else {
                    toast.error(data.message);
                }
            })

    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-4 top-6">✕</label>
                    <h3 className="text-primary text-lg font-bold mb-5">Book {name}!</h3>
                    <form onSubmit={handleBooking}>
                        <input type="text" name='userName' defaultValue={user?.displayName} placeholder="User Name" disabled className="input input-bordered w-full mb-3" />
                        <input type="text" name='email' defaultValue={user?.email} placeholder="User Email" disabled className="input input-bordered w-full mb-3" />
                        <input type="text" name='productName' defaultValue={name} placeholder="Booking Product Name" disabled className="input input-bordered w-full mb-3" />
                        <input type="text" name='price' defaultValue={resalePrice} placeholder="Price" disabled className="input input-bordered w-full mb-3" />
                        <input type="text" name='phone' placeholder="Your Phone Number" className="input input-bordered w-full mb-3" required />
                        <input type="text" name='location' placeholder="Meeting Location" className="input input-bordered w-full mb-3" />
                        <input type="submit" value='Submit' className='btn btn-primary w-full' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;