import React from 'react';

const PrimaryButton = ({ children, classes }) => {
    return (
        <button
            className={`btn bg-gradient-to-r from-secondary to-primary text-white px-5 ${classes}`}>
            {children}
        </button>
    );
};

export default PrimaryButton;