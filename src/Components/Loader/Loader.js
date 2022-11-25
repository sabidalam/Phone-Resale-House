import React from 'react';

const Loader = () => {
    return (
        <div className='flex justify-center items-center h-full my-8'>
            <p className='text-7xl font-thin'>L</p>
            <div className='w-10 h-10 border-8 border-dashed rounded-full animate-spin mt-5 border-primary'></div>
            <p className='text-7xl font-thin'>ading....</p>
        </div>
    );
};

export default Loader;