// Card.js
import React from 'react';
import './Card.css'; // Importe o CSS dos cartões aqui

const Card = ({ data }) => {
    return (
        <div className="card">
            {Object.entries(data).map(([key, value], index) => (
                <div key={index} className="card-content">
                    <p><strong>{key}:</strong> {value as React.ReactNode}</p>
                </div>
            ))}
        </div>
    );
};

export default Card;
