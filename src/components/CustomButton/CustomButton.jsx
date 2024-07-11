import React from 'react';
import PropTypes from 'prop-types';
import './CustomButton.css';

const CustomButton = ({ onClick, children }) => {
    const handleButtonClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <button className="custom-button" onClick={handleButtonClick}>
            {children}
        </button>
    );
};

CustomButton.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
};

export default CustomButton;
