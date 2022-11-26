import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Loader from '../../../Components/Loader/Loader';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const { data: categories, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/productCategory');
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <Loader></Loader>
    }

    const handleAddProduct = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    const product = {
                        name: data.productName,
                        id: data.id,
                        brand: data.category,
                        originalPrice: data.originalPrice,
                        resalePrice: data.resalePrice,
                        usedTime: data.usedTime,
                        productCondition: data.condition,
                        sellerName: data.sellerName,
                        email: data.email,
                        location: data.location,
                        phone: data.phone,
                        description: data.description,
                        selling_post_date: data.date,
                        img: imageData.data.url,
                    };
                    fetch('http://localhost:5000/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.acknowledged) {
                                toast.success('Product Added Successfully');
                            }

                        })
                }
            })
    }
    return (
        <div className='my-10'>
            <h3 className="text-xl font-bold mb-4 text-center">Add A Product</h3>
            <div className='w-96 mx-auto p-7 border-2 rounded-lg'>
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className="form-control w-full">
                        <input type='text'
                            {...register("productName")} placeholder='Product Name' className="input input-bordered mb-3" required />
                    </div>
                    <div className="form-control w-full mb-3">
                        <div className="form-control w-full">
                            <select className="select select-bordered" {...register("category")} required>
                                <option disabled selected>Select Product Brand Category</option>
                                {
                                    categories.map(category =>
                                        <option key={category._id}
                                            value={category.name}>
                                            {category.name}
                                        </option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-control w-full mb-3">
                        <div className="form-control w-full">
                            <select className="select select-bordered" {...register("id")} required>
                                <option disabled selected>Select your Category wise Product-ID</option>
                                {
                                    categories.map(category =>
                                        <option key={category._id}
                                            value={category._id}>
                                            {category._id} for {category.name}
                                        </option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <input type='text'
                            {...register("originalPrice")} placeholder='Original Price' className="input input-bordered mb-3" required />
                    </div>
                    <div className="form-control w-full">
                        <input type='text'
                            {...register("resalePrice")} placeholder='Resale Price' className="input input-bordered mb-3" required />
                    </div>
                    <div className="form-control w-full mb-3">
                        <div className="form-control w-full">
                            <select className="select select-bordered" {...register("condition")} required>
                                <option disabled selected>Select Your Product Condition</option>
                                <option>Excellent</option>
                                <option>Good</option>
                                <option>Fair</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <input type='text'
                            {...register("usedTime")} placeholder='Year of Used(year, month, day)' className="input input-bordered mb-3" required />
                    </div>
                    <div className="form-control w-full">
                        <textarea  {...register("description")} className="textarea textarea-bordered mb-3" placeholder="Product Description" required></textarea>
                    </div>
                    <div className="form-control w-full">
                        <input type='text'
                            {...register("sellerName")} placeholder='Your Name' className="input input-bordered mb-3" required />
                    </div>
                    <div className="form-control w-full">
                        <input type='email'
                            {...register("email")}
                            required
                            placeholder='Your Registered Email'
                            className="input input-bordered mb-3" />
                    </div>
                    <div className="form-control w-full">
                        <input type='text'
                            {...register("location")} placeholder='Location' className="input input-bordered mb-3" required />
                    </div>
                    <div className="form-control w-full">
                        <input type='text'
                            {...register("phone")} placeholder='Phone Number' className="input input-bordered mb-3" required />
                    </div>
                    <div className="form-control w-full">
                        <input type='date'
                            {...register("date")} placeholder='Todays Date' className="input input-bordered mb-3" required />
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Product Image</span></label>
                        <input type='file'
                            {...register("image")} className="input input-bordered mb-3 pt-2" required />
                    </div>
                    <input type="submit" value='Add Product' className="btn btn-primary input-bordered w-full mb-5" />
                </form >

            </div>
        </div>
    );
};

export default AddProduct;