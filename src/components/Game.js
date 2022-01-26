import React, { Component } from 'react';
import { Board } from './Board';
import { calculateWinner } from '../helper/calculateWinner';
import '../index.scss';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            winner: null,
            xIsNext: true
        }
    }

    handleClick(i){
        const { winner, history, stepNumber, xIsNext } = this.state;

        if (winner) {
            return;
        }

        const historyShapshot = history.slice(0, stepNumber + 1);
        const current = historyShapshot[historyShapshot.length - 1];
        const squares = current.squares.slice();
        squares[i] = xIsNext ? 'X' : 'O';

        this.setState({
            history: historyShapshot.concat([{
                squares:squares,
            }]),
            stepNumber: historyShapshot.length,
            winner: calculateWinner(squares),
            xIsNext: !xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const { winner, history, stepNumber, xIsNext } = this.state;
        const current = history[stepNumber];
        const moves = history.map((step, move) => {
            const desc = move
                ? `Go to move #${move}` 
                : 'Go to game start';

            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        const status = (winner) 
            ? `Winner: ${winner}`
            :  (stepNumber === 9)
                ? 'Game over draw'
                : 'Next player: ' + (xIsNext ? 'X' : 'O');

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div className="game-status">{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;