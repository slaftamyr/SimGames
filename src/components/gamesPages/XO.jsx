import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const XO = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const navigate = useNavigate();

  const checkWinner = (newBoard) => {
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
    for (let [a, b, c] of lines) {
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }
    if (!newBoard.includes("")) return "Draw";
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
   
      <Box sx={{ textAlign: "left" }}>
        <IconButton onClick={() => navigate("/")}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        XO Game
      </Typography>

      <Typography variant="h6" gutterBottom>
        {winner
          ? winner === "Draw"
            ? "🤝 It's a Draw!"
            : `🎉 Winner: ${winner}`
          : `Turn: ${xIsNext ? "X" : "O"}`}
      </Typography>
 
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "10px",
          justifyContent: "center",
          mt: 4,
        }}
      >
        {board.map((cell, index) => (
          <Box
            key={index}
            onClick={() => handleClick(index)}
            sx={{
              width: 100,
              height: 100,
              backgroundColor:
                cell === "X" ? "#f3e5f5" : cell === "O" ? "#e3f2fd" : "#fff",
              border: "2px solid #ccc",
              fontSize: 36,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: cell || winner ? "not-allowed" : "pointer",
              borderRadius: 2,
            }}
          >
            {cell}
          </Box>
        ))}
      </Box>

 
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 4 }}
        onClick={resetGame}
      >
        Restart Game
      </Button>
    </Box>
  );
};

export default XO;
