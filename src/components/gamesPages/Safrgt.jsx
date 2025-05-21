import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Alert,
} from '@mui/material';

export default function SafrgtGame() {
  const initialBoard = [
    ["X", null, "O"],
    ["X", null, "O"],
    ["X", null, "O"],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState("X");
  const [selected, setSelected] = useState(null);
  const [winner, setWinner] = useState(null);

  const handleClick = (row, col) => {
    if (winner) return;

    const cell = board[row][col];

    if (selected) {
      const [selRow, selCol] = selected;

      if (!cell) {
        const newBoard = board.map((r) => [...r]);
        newBoard[row][col] = turn;
        newBoard[selRow][selCol] = null;
        setBoard(newBoard);
        setSelected(null);
        checkWinner(newBoard);
        setTurn(turn === "X" ? "O" : "X");
      } else {
        setSelected(null); // إلغاء التحديد
      }
    } else {
      if (cell === turn) {
        setSelected([row, col]);
      }
    }
  };

  const checkWinner = (b) => {
    const lines = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (let line of lines) {
      const [a, b_, c] = line;
      const values = [b[a[0]][a[1]], b[b_[0]][b_[1]], b[c[0]][c[1]]];
      if (values.every((v) => v === turn)) {
        const cols = [a[1], b_[1], c[1]];
        const colSum = cols.reduce((acc, cur) => acc + cur, 0);
        const isOriginalCol = (turn === "X" && colSum === 0) || (turn === "O" && colSum === 6);
        if (!isOriginalCol) {
          setWinner(turn);
        }
      }
    }
  };

  const resetGame = () => {
    setBoard([
      ["X", null, "O"],
      ["X", null, "O"],
      ["X", null, "O"],
    ]);
    setTurn("X");
    setSelected(null);
    setWinner(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" align="center" gutterBottom>
        لعبة صفرجت (Safrgt)
      </Typography>

      <Paper elevation={3} sx={{ width: "max-content", mx: "auto", p: 1 }}>
        <Box display="grid" gridTemplateColumns="repeat(3, 80px)" gap={1}>
          {board.map((row, rIdx) =>
            row.map((cell, cIdx) => (
              <Box
                key={`${rIdx}-${cIdx}`}
                onClick={() => handleClick(rIdx, cIdx)}
                width={80}
                height={80}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor={cell ? (cell === "X" ? "primary.main" : "secondary.main") : "grey.200"}
                color={cell ? "white" : "black"}
                fontSize="1.8rem"
                fontWeight="bold"
                borderRadius={1}
                border={
                  selected?.[0] === rIdx && selected?.[1] === cIdx
                    ? "3px solid yellow"
                    : "1px solid #aaa"
                }
                sx={{ cursor: "pointer", transition: "0.2s" }}
              >
                {cell || ""}
              </Box>
            ))
          )}
        </Box>
      </Paper>

      <Box mt={3} textAlign="center">
        {winner ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            الفائز {winner}
          </Alert>
        ) : (
          <Typography variant="h6" color="textSecondary">
            دور اللاعب: {turn}
          </Typography>
        )}
        <Button variant="outlined" onClick={resetGame} sx={{ mt: 2 }}>
          إعادة اللعبة
        </Button>
      </Box>
    </Box>
  );
}
