import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate, } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import useToken from '../../Hooks/useToken';
import image from '../../assets/login/Tablet login-pana.png'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email);
            })
            .catch(err => {
                console.error(err);
                setLoginError(err.message);
            });
    }

    const handleGoogleSignIn = () => {
        const googleProvider = new GoogleAuthProvider();
        googleSignIn(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('SignIn Successful');
                setLoginUserEmail(user.email);
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    return (
        <div>
            <div className="hero my-8 max-w-5xl mx-auto">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center w-1/2 mx-auto lg:mr-24 lg:mb-8" data-aos='fade-right'>
                        <img src={image} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm border-2 p-8 rounded-xl border-white" data-aos='fade-left'>
                        <h2 className='text-2xl text-center font-bold text-violet-200'>Login</h2>
                        <form onSubmit={handleSubmit(handleLogin)}>
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
                                {loginError && <p className='text-error'>{loginError}</p>}
                            </div>
                            <input type="submit" value='Login' className="btn btn-primary bg-gradient-to-r from-secondary to-primary text-white w-full mb-5" />
                        </form >
                        <p className='text-center text-sm text-gray-700'>New to Phone Resale House? <Link to='/signUp' className='text-violet-100'>Please SignUp</Link></p>
                        <div className='divider text-white'>Or</div>
                        <button onClick={handleGoogleSignIn} className='btn btn-neutral btn-outline w-full'><FcGoogle className='mr-2 text-xl' /> Continue with Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;