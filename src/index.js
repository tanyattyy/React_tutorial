import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// // delete Square class
// class Square extends React.Component {
//     // ???: why delete the constructor from Square ??? -- Function components
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
// ??? why change this.props to props ??? -- Function components =>>this.props belongs to the Square class; props is the parameter of Square() function
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    // delete the constructor of Board class, coz there is no need any longer to maintain squares
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true, // ???: set the first move to be "X" by default ??? -- Taking turns =>>reason is in the 52 lines
    //     };
    // }

    renderSquare(i) {
        // pass two properties, namely value and onClick from a parent Board component to a child Square component
        return <Square value = {this.props.squares[i]}
        onClick = {() => this.props.onClick(i)}
        />;  // ???Q1: Replace this.state.squares[i] with this.props.squares[i] in Board’s renderSquare.
            // Replace this.handleClick(i) with this.props.onClick(i) in Board’s renderSquare. ???
            // Lifting state up again
    }

    render() {
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if (winner) {
        //     status = 'Winner: ' + winner;
        // } else {
        //     status = 'Next player: ' +
        //         (this.state.xIsNext ? 'X' : 'O');
        // }

        return (
            <div>
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
    // set up the initial state for the Game component within its constructor, and maintain game's state
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        // call .slice() to create a copy of the squares array to modify instead of modifying the existing array (keep data immutable)
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;  // end the game if calculateWinner(squares) != null or squares[i] != null
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{squares: squares}]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext, // reverse the value of the boolean variable xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        // use map() method to map over the history of moves, and create a list item <li> to contain a list of move
        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li key={{move}}>
                    <button onClick = {() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <h3>Tic Tac Toe</h3>
                    <Board
                        squares = {current.squares}
                        onClick = {(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
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
            return squares[a];  // &&：both true is true
        }
    }
    return null;
}
