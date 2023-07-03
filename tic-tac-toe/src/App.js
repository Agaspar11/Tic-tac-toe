import './App.css';
import React from 'react';
import { useState } from 'react';
import Board from './components/Board';

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [result, setResult] = useState(null);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  const handleClick = (index) => {
    if (result || squares[index]) {
      return;
    }

    const newSquares = [...squares];
    newSquares[index] = xIsNext ? 'X' : 'O';

    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newSquares);
    if (winner) {
      setResult(winner);
      if (winner === 'X') {
        setXScore(xScore + 1);
      } else {
        setOScore(oScore + 1);
      }
    } else if (newSquares.every((square) => square !== null)) {
      setResult('draw');
    }
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setResult(null);
  };

  const status = result ? (result === 'draw' ? "It's a draw!" : `Winner: ${result}`) : `Player Turn: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="app">
      <h1>Tic-Tac-Toe</h1>
      <div className="score">
        <div>Player X: {xScore}</div>
        <div>Player O: {oScore}</div>
      </div>
      <Board squares={squares} onClick={handleClick} />
      <div className="status">{status}</div>
      {result && (
        <button className="restart-button" onClick={handleRestart}>
          Restart
        </button>
      )}
    </div>
  );
};

export default App;

// Helper function to calculate the winner
const calculateWinner = (squares) => {
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
      return squares[a];
    }
  }

  return null;
};
