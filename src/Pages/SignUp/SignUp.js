import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');

    const handleSignUp = data => {
        console.log(data);
        setSignUpError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast('User Created Successfully');
                const userInfo = {
                    displayName: data.name,
                    accountType: data.accountType
                }
                updateUser(userInfo)
                    .then(() => {
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => {
                console.error(err);
                setSignUpError(err.message);
            });
    }

    const handleGoogleSignIn = () => {
        const googleProvider = new GoogleAuthProvider();
        googleSignIn(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('SignIn Successful');
            })
            .catch(err => console.error(err))
    }
    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7 border-2 rounded-lg'>
                <h2 className='text-xl text-center font-bold'>Sign-Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input type='text'
                            {...register("name")} className="input input-bordered mb-3" required />
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Account Type</span></label>
                        <select {...register("accountType")} className="select select-bordered w-full max-w-xs" required>
                            <option defaultValue='User'>User</option>
                            <option>Seller</option>
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type='email'
                            {...register("email", { required: "Email Address is required" })}
                            className="input input-bordered mb-3" />
                        {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full mb-3">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type='password'
                            {...register("password",
                                { required: "Password is required", minLength: { value: 6, message: 'Password must be atleast 6 characters or longer' } })}
                            className="input input-bordered" />
                        {errors.password && <p className='text-error'>{errors.password?.message}</p>}
                    </div>
                    <div>
                        {signUpError && <p className='text-error'>{signUpError}</p>}
                    </div>
                    <input type="submit" value='SignUP' className="btn btn-primary bg-gradient-to-r from-primary to-secondary w-full mb-5" />
                </form >
                <p className='text-center'>Already Have an Account? <Link to='/login' className='text-secondary'>Please Login</Link></p>
                <div className='divider'>Or</div>
                <button onClick={handleGoogleSignIn} className='btn btn-primary btn-outline w-full'><FcGoogle className='text-green-500 mr-2 text-xl' /> Continue with Google</button>
            </div>
        </div>
    );
};

export default SignUp;