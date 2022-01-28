import React, { useEffect, useState } from 'react';
import { Board } from './Board';
import { calculateWinner } from '../helper/calculateWinner';
import '../index.scss';

export const Game = () => {
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [stepNumber, setStepNumber] = useState(() => {
        const stepNumberSaved = localStorage.getItem("stepNumber");
        return JSON.parse(stepNumberSaved) || 0;
    });
    const [history, setHistory] = useState(() => {
        const historySaved = localStorage.getItem("history");
        return JSON.parse(historySaved) || [{ squares: Array(9).fill(null)}];
    });

    useEffect(() => {
        localStorage.setItem("stepNumber", JSON.stringify(stepNumber));
        localStorage.setItem("history", JSON.stringify(history));
    }, [stepNumber, history]);

    const current = history[stepNumber];
    const moves = history.map((step, move) => {
        const desc = move
            ? `Go to move #${move}` 
            : 'Go to game start';

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    const status = (winner) 
        ? `Winner: ${winner}`
        :  (stepNumber === 9)
            ? 'Game over draw'
            : 'Next player: ' + (xIsNext ? 'X' : 'O');

    const handleClick = (i) => {
        if (winner) {
            return;
        }

        const historyShapshot = history.slice(0, stepNumber + 1);
        const current = historyShapshot[historyShapshot.length - 1];
        const squares = current.squares.slice();
        squares[i] = xIsNext ? 'X' : 'O';

        setHistory(historyShapshot.concat([{ squares,}]));
        setStepNumber(historyShapshot.length);
        setWinner(calculateWinner(squares));
        setXIsNext(!xIsNext);
    }

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={i => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div className="game-status">{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}
