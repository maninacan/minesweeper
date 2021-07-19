import React from "react";
import GameCell, { CellContentEnum } from "./GameCell";
import { useDispatch } from "react-redux";
import { revealCell } from "../redux/gameSlice";

export type CellLayout = {
  content: CellContentEnum;
  isHidden: boolean;
};

export interface GameBoardProps {
  gameBoardLayout: CellLayout[][];
}

const GameBoard = ({ gameBoardLayout }: GameBoardProps) => {
  const dispatch = useDispatch();
  return (
    <div>
      {gameBoardLayout.map((row: CellLayout[], rowIndex) => (
        <div className="flex flex-row">
          {row.map((cell: CellLayout, columnIndex) => (
            <GameCell
              content={cell.content}
              isHidden={cell.isHidden}
              onClick={() =>
                dispatch(revealCell({ row: rowIndex, column: columnIndex }))
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
