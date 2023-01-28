import React, { useEffect } from 'react';
import { FaArrowRight } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    return (
        <div className="max-w-sm lg:max-w-5xl mx-auto my-20">
            <div data-aos='zoom-in'>
                <h1 className="text-3xl text-center font-bold text-violet-300 mb-2">Get In Touch</h1>
                <p className="text-white text-center mb-10 text-lg">Feel Free To Contact With Us</p>
                <div className="flex justify-center items-center">
                    <form
                        action=""
                        method=""
                        className=" flex flex-col w-full md:w-1/2"
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter your email"
                            className="my-4 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
                        />
                        <textarea
                            name="message"
                            placeholder="Enter your message"
                            rows="5"
                            className="p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
                        ></textarea>

                        <button className="btn bg-gradient-to-r from-secondary to-primary text-white my-4 px-8 mx-auto flex items-center">
                            Send
                            <FaArrowRight className='ml-1' />
                        </button>
                    </form>
                </div>
            </div>
            <div className="text-center grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8">
                <div className="card w-76 bg2 text-neutral-content mb-10 hover:border-solid border-2 hover:border-purple-700 hover:animate-pulse aos-init" data-aos="zoom-in-right">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-2xl text-violet-300"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path></svg>
                        </h2>
                        <h2 className="card-title text-violet-300">Email</h2>
                        <p className='text-violet-300'>phoneResale@gmail.com</p>
                        <p className="text-sm text-gray-400">send a message</p>
                    </div>
                </div>
                <div className="card w-76 bg2 text-neutral-content mb-10 hover:border-solid border-2 hover:border-purple-700 hover:animate-pulse aos-init" data-aos="flip-left">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-2xl text-violet-300"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"></path></svg></h2>
                        <h2 className="card-title text-violet-300">Phone</h2>
                        <p className='text-violet-300'>+8801521569825</p>
                        <p className="text-sm text-gray-400">Call us</p>
                    </div>
                </div>
                <div className="card w-76 bg2 text-neutral-content mb-10 hover:border-solid border-2 hover:border-purple-700 hover:animate-pulse aos-init" data-aos="zoom-in-left">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-2xl text-violet-300"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z"></path></svg></h2>
                        <h2 className="card-title text-violet-300">Location</h2>
                        <p className='text-violet-300'>Dhaka, Bangladesh</p>
                        <p className="text-sm text-gray-400">See map</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;