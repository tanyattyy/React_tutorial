import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// // delete Square class
// class Square extends React.Component {
//     // ???Q1: why delete the constructor from Square ??? -- Function components
//     // constructor(props) {
//     //     super(props);  // In JS classes, you need to always call super when defining the constructor of a subclass
//     //     this.state = {
//     //         value: null,
//     //     };
//     // }
//
//     render() {
//         return (   // show the value, and make an interactive component
//             <button
//                 className="square"
//                 onClick = {() => this.props.onClick()}
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }

// replace the Square class with this function
// ???Q2: why change this.props to props ??? -- Function components
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true, // ???Q3: set the first move to be "X" by default ??? -- Taking turns
        };
    }

    handleClick(i) {
        // call .slice() to create a copy of the squares array to modify instead of modifying the existing array (keep data immutable)
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return; // ???Q6: do not understand this statement ??? -- Declaring a Winner
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({squares: squares,
        xIsNext: !this.state.xIsNext, // ???Q4: do not understand what it means ??? -- Taking turns
        });
    }

    renderSquare(i) {
        // pass two properties, namely value and onClick from a parent Board component to a child Square component
        return <Square value = {this.state.squares[i]}
        onClick = {() => this.handleClick(i)}
        />;
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' +
                (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];  // ???Q5: do not understand this logic ??? --- Declaring a winner
        }
    }
    return null;
}
