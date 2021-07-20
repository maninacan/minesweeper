import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNumLeftToClear, selectNumMines } from "../redux/gameSlice";
import {
  changeStatus,
  selectCurrentStatus,
  StatusEnum,
} from "../redux/statusSlice";

const StatusPanel = () => {
  const dispatch = useDispatch();
  const numLeftToClear = useSelector(selectNumLeftToClear);
  const numMines = useSelector(selectNumMines);
  const gameStatus = useSelector(selectCurrentStatus);

  if (numLeftToClear === 0 && gameStatus === StatusEnum.playing) {
    dispatch(changeStatus(StatusEnum.won));
  }

  return (
    <div className="flex flex-col">
      <div>Left to clear: {numLeftToClear}</div>
      <div>Mines: {numMines}</div>
      <div>Status: {gameStatus}</div>
    </div>
  );
};

export default StatusPanel;
