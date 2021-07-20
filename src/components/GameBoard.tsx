import React from "react";
import GameCell, { CellContentEnum } from "./GameCell";
import {
  changeFlagStatus,
  revealAllMines,
  revealCell,
  revealNeighboringEmptyCells,
} from "../redux/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStatus,
  selectCurrentStatus,
  StatusEnum,
} from "../redux/statusSlice";

export type CellLayout = {
  content: CellContentEnum;
  isHidden: boolean;
  isFlagged: boolean;
};

export interface GameBoardProps {
  gameBoardLayout: CellLayout[][];
}

const GameBoard = ({ gameBoardLayout }: GameBoardProps) => {
  const dispatch = useDispatch();
  const gameStatus = useSelector(selectCurrentStatus);

  return (
    <div className="pt-5 pb-5">
      {gameBoardLayout.map((row: CellLayout[], rowIndex) => (
        <div key={rowIndex} className="flex flex-row">
          {row.map((cell: CellLayout, columnIndex) => {
            return (
              <GameCell
                key={columnIndex}
                content={cell.content}
                isHidden={cell.isHidden}
                isFlagged={cell.isFlagged}
                onRightClick={(e) => {
                  e.preventDefault();
                  if (!cell.isFlagged && cell.isHidden) {
                    dispatch(
                      changeFlagStatus({
                        flagStatus: true,
                        row: rowIndex,
                        column: columnIndex,
                      })
                    );
                  } else {
                    dispatch(
                      changeFlagStatus({
                        flagStatus: false,
                        row: rowIndex,
                        column: columnIndex,
                      })
                    );
                  }
                }}
                onClick={(e) => {
                  if (gameStatus !== StatusEnum.playing) {
                    // do nothing
                  } else if (cell.isFlagged) {
                    // do nothing
                  } else if (cell.content === CellContentEnum.MINE) {
                    dispatch(
                      revealAllMines({
                        currentSelectionCoordinates: {
                          row: rowIndex,
                          column: columnIndex,
                        },
                      })
                    );
                    dispatch(changeStatus(StatusEnum.lost));
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
