import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate, } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import useToken from '../../Hooks/useToken';

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
    return (
        <div className='h-[700px] flex justify-center items-center'>
            <div className='w-96 p-7 border-2 rounded-lg'>
                <h2 className='text-xl text-center font-bold'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
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
                        {loginError && <p className='text-error'>{loginError}</p>}
                    </div>
                    <input type="submit" value='Login' className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white w-full mb-5" />
                </form >
                <p className='text-center'>New to Phone Resale House? <Link to='/signUp' className='text-secondary'>Please SignUp</Link></p>
                <div className='divider'>Or</div>
                <button onClick={handleGoogleSignIn} className='btn btn-primary btn-outline w-full'><FcGoogle className='mr-2 text-xl' /> Continue with Google</button>
            </div>
        </div>
    );
};

export default Login;