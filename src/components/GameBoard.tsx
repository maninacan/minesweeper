import React from "react";
import GameCell from "./GameCell";

const GameBoard = () => {
  return (
    <div>
      <GameCell content="mine" />
      <GameCell content="exploded-mine" />
      <GameCell content="empty" />
      <GameCell content="1" />
      <GameCell content="2" />
      <GameCell content="3" />
      <GameCell content="4" />
      <GameCell content="5" />
      <GameCell content="6" />
      <GameCell content="7" />
      <GameCell content="8" />
      <GameCell content="9" />
    </div>
  );
};

export default GameBoard;
