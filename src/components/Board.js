import React from 'react';
import { Square } from './Square';

export const Board = ({ squares, onClick }) => {
    const renderSquare = (i) => (
        <Square key={i} value={squares[i]} onClick={() => onClick(i)}/>
    );

    return (
        <div>
            {
                [...Array(3)].map((row, i) => (
                    <div key={i} className="board-row">
                        {
                            [...Array(3)].map((item, j) => renderSquare(3 * i + j))
                        }
                    </div>
                ))
            }
        </div>
    )
}
