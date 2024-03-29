import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate, } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useToken from '../../Hooks/useToken';
import image from '../../assets/login/Mobile login-pana (1).png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');

    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }

    const handleSignUp = data => {
        setSignUpError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User Created Successfully');
                const userInfo = {
                    displayName: data.name
                };
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, data.accountType);

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
                const accountType = 'User';
                saveUser(user.displayName, user.email, accountType);
            })
            .catch(err => console.error(err))
    };

    const saveUser = (name, email, accountType) => {
        const user = { name, email, accountType };
        fetch('https://phone-resale-house-server.vercel.app/users', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCreatedUserEmail(email);
            });
    };

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    return (
        <div>
            <div className="hero my-8 max-w-5xl mx-auto">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center w-1/2 mx-auto lg:mr-24 lg:mb-28" data-aos='fade-right'>
                        <img src={image} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm border-2 p-8 rounded-xl border-white" data-aos='fade-left'>
                        <h2 className='text-2xl text-violet-200 text-center font-bold'>Sign-Up</h2>
                        <form onSubmit={handleSubmit(handleSignUp)}>
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text text-gray-300">Name</span></label>
                                <input type='text'
                                    {...register("name")} className="input input-bordered mb-3" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text text-gray-300">Account Type</span></label>
                                <select {...register("accountType")} className="select select-bordered w-full max-w-xs" required>
                                    <option defaultValue='User'>User</option>
                                    <option>Seller</option>
                                </select>
                            </div>
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text text-gray-300">Email</span></label>
                                <input type='email'
                                    {...register("email", { required: "Email Address is required" })}
                                    className="input input-bordered mb-3" />
                                {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                            </div>
                            <div className="form-control w-full mb-3">
                                <label className="label"><span className="label-text text-gray-300">Password</span></label>
                                <input type='password'
                                    {...register("password",
                                        { required: "Password is required", minLength: { value: 6, message: 'Password must be atleast 6 characters or longer' } })}
                                    className="input input-bordered" />
                                {errors.password && <p className='text-error'>{errors.password?.message}</p>}
                            </div>
                            <div>
                                {signUpError && <p className='text-error'>{signUpError}</p>}
                            </div>
                            <input type="submit" value='Sign-UP' className="btn btn-primary bg-gradient-to-r from-secondary to-primary text-white w-full mb-5" />
                        </form >
                        <p className='text-center text-sm text-gray-700'>Already Have an Account? <Link to='/login' className='text-violet-100'> Please Login</Link></p>
                        <div className='divider text-white'>Or</div>
                        <button onClick={handleGoogleSignIn} className='btn btn-neutral btn-outline w-full'><FcGoogle className='mr-2 text-xl' /> Continue with Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;