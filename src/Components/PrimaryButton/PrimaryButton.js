import React from 'react';

const PrimaryButton = ({ children, classes }) => {
    return (
        <button
            className={`btn btn-primary bg-gradient-to-r from-primary to-secondary text-white px-5 ${classes}`}>
            {children}
        </button>
    );
};

export default PrimaryButton;