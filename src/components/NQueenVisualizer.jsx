import React, { useState, useEffect } from "react";
import "../index.css";

const NQueenVisualizer = ({ n }) => {
  const [board, setBoard] = useState(
    Array(n)
      .fill()
      .map(() => Array(n).fill(0))
  );

  useEffect(() => {
    const solve = async () => {
      const newBoard = Array(n)
        .fill()
        .map(() => Array(n).fill(0));
      await solveNQueens(newBoard, 0);
    };
    solve();
  }, []);

  const isSafe = (board, row, col) => {
    for (let i = 0; i < col; i++) {
      if (board[row][i]) return false;
    }
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j]) return false;
    }
    for (let i = row, j = col; i < n && j >= 0; i++, j--) {
      if (board[i][j]) return false;
    }
    return true;
  };

  const solveNQueens = async (board, col) => {
    if (col >= n) return true;
    for (let i = 0; i < n; i++) {
      if (isSafe(board, i, col)) {
        board[i][col] = 1;
        setBoard([...board.map((row) => [...row])]);
        await sleep(500);
        if (await solveNQueens(board, col + 1)) return true;
        board[i][col] = 0;
        setBoard([...board.map((row) => [...row])]);
        await sleep(500);
      }
    }
    return false;
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${n}, 50px)` }}
    >
      {board.map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            className={`cell ${(i + j) % 2 === 0 ? "white" : "gray"}`}
          >
            {cell ? "♛" : ""}
          </div>
        ))
      )}
    </div>
  );
};

export default NQueenVisualizer;
