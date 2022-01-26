import React from 'react';
import Square from './Square';

function Board(props) {
    const renderSquare = (i) => (
        <Square key={i} value={props.squares[i]} onClick={() => props.onClick(i)}/>
    );

    return (
            <div>
                {
                    [...Array(3)].map((elem, i) => (
                        <div key={i} className="board-row">
                        {
                            [...Array(3)].map((elem, j) => renderSquare(3 * i + j))
                        }
                        </div>
                    ))
                }
            </div>
        )
}

export default Board;