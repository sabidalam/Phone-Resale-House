import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const ReportedModal = ({ item, setItem }) => {
    const { user } = useContext(AuthContext);
    const { _id, name, id, brand, img, } = item;

    const handleReport = event => {
        event.preventDefault();
        const form = event.target;
        const userName = form.userName.value;
        const email = form.email.value;
        const productName = form.productName.value;
        const reason = form.reason.value;

        const reportedItem = {
            userName: userName,
            email: email,
            productName: productName,
            productID: _id,
            id: id,
            reason: reason,
            brand,
            img,
        }
        fetch('http://localhost:5000/reportedItems', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reportedItem)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    setItem(null);
                    toast.success('Thanks for your response..We saved your report');
                }
                else {
                    toast.error(data.message);
                }
            })
    }
    return (
        <>
            <input type="checkbox" id="reportedModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="reportedModal" className="btn btn-sm btn-circle absolute right-4 top-6">✕</label>
                    <h3 className="text-lg font-bold mb-5">You are reporting for {name}</h3>
                    <form onSubmit={handleReport}>
                        <input type="text" name='userName' defaultValue={user?.displayName} placeholder="User Name" disabled className="input input-bordered w-full mb-3" />
                        <input type="text" name='email' defaultValue={user?.email} placeholder="User Email" disabled className="input input-bordered w-full mb-3" />
                        <input type="text" name='productName' defaultValue={name} placeholder="Product Name" disabled className="input input-bordered w-full mb-3" />
                        <textarea name='reason' className="textarea textarea-bordered w-full mb-3" placeholder="Tell us why you are reporting" required></textarea>
                        <input type="submit" value='Submit' className='btn btn-primary w-full' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default ReportedModal;