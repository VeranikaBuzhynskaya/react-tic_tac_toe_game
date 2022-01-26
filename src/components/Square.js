import React from 'react';

export const Square = ({ value, onClick }) => (
    <button className="square" onClick={onClick}>
        {value}
    </button> 
)
