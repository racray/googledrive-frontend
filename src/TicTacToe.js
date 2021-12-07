import * as React from 'react';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Button from '@mui/material/Button';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { GameBox } from "./GameBox";

export function TicTacToe() {
  const nullv = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ];
  const { width, height } = useWindowSize();
  const [board, setBoard] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ]);
  const [isXTurn, setIsXTurn] = useState(true);

  const decideWinner = (board) => {
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
      if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = decideWinner(board);

  const handleClick = (index) => {
    //winner == null becoz stop after wining
    // !board[index] fix a value on a box
    if (winner === null && !board[index]) {
      const boardCopy = [...board];
      boardCopy[index] = isXTurn ? "X" : "O";
      setBoard(boardCopy);
      setIsXTurn(!isXTurn);
    }


  };

  const change = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[j] === "X" || board[j] === "O") {
          return "none";
        }
      }
      return "block";
    }
  };

  const changeturn = {
    display: change(),
    textAlign: "center",
    margin: "auto"
  };

  const turn = {
    textAlign: "center",
    display: winner ? "none" : "block"
  };

  return (
    <div className="full-game">
      <Paper elevation={3} style={{ marginLeft: "30rem", marginTop: "7rem" }}>
        {isXTurn ? <div><h4 style={turn}>Its X's turn </h4></div> : <div><h4 style={turn}>Its O's turn </h4></div>}

        {winner ? <Confetti width={width} height={height} gravity={0.03} /> : ""}
        <div className="board">
          {/* val takes value from board and board value changes by setboard */}
          {board.map((val, index) => (
            <GameBox val={val} onPlayerClick={() => handleClick(index)} />
          ))}
        </div>

        {isXTurn ? <Button onClick={() => { setIsXTurn(!isXTurn); }} style={changeturn}>Change to O's turn</Button> : <Button onClick={() => { setIsXTurn(!isXTurn); }} style={changeturn}>Change to X's turn</Button>}

        {winner ? <h1 style={{ textAlign: "center", color: "crimson", fontSize: "3rem" }}>Winner is : {winner} </h1> : ""}
        <Button onClick={() => {
          setBoard(nullv);
        }} variant="outlined" style={{ marginLeft: "10rem", marginTop: "3rem" }}>Reset</Button>
      </Paper>
    </div>
  );
}
