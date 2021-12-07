import * as React from 'react';


export function GameBox({ onPlayerClick, val }) {
  const styles = { color: val === "X" ? "red" : "blue" };
  return (
    <div style={styles} onClick={onPlayerClick} className="game-box">
      {val}
    </div>
  );

}
