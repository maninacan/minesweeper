import React from "react";
import GameCell, { CellContentEnum } from "./GameCell";
import {
  revealAllMines,
  revealCell,
  revealNeighboringEmptyCells,
} from "../redux/gameSlice";
import { useDispatch } from "react-redux";

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
        <div key={rowIndex} className="flex flex-row">
          {row.map((cell: CellLayout, columnIndex) => {
            return (
              <GameCell
                key={columnIndex}
                content={cell.content}
                isHidden={cell.isHidden}
                onClick={() => {
                  if (cell.content === CellContentEnum.MINE) {
                    dispatch(
                      revealAllMines({
                        currentSelectionCoordinates: {
                          row: rowIndex,
                          column: columnIndex,
                        },
                      })
                    );
                  } else if (cell.content === CellContentEnum.EMPTY) {
                    dispatch(
                      revealNeighboringEmptyCells({
                        currentCellCoordinates: {
                          row: rowIndex,
                          column: columnIndex,
                        },
                      })
                    );
                  } else {
                    dispatch(
                      revealCell({ row: rowIndex, column: columnIndex })
                    );
                  }
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
