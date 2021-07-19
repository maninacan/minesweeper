import React from "react";
import GameCell, { CellContentEnum } from "./GameCell";

export type CellLayout = {
  content: CellContentEnum;
  isHidden: boolean;
};

export interface GameBoardProps {
  gameBoardLayout: CellLayout[][];
}

const GameBoard = ({ gameBoardLayout }: GameBoardProps) => {
  return (
    <div>
      {gameBoardLayout.map((row: CellLayout[]) => (
        <div className="flex flex-row">
          {row.map((cell: CellLayout) => (
            <GameCell content={cell.content} isHidden={cell.isHidden} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
