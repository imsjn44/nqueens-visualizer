import React from "react";
import NQueenVisualizer from "./components/NQueenVisualizer";

export default function App() {
  return (
    <div className="app-container">
      <h1>N-Queens Visualizer</h1>
      <NQueenVisualizer n={8} />
    </div>
  );
}
