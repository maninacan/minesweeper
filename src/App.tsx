import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameBoard from "./components/GameBoard";
import SettingsSelector from "./components/SettingsSelector";
import "./App.scss";
import { generateGame, select } from "./redux/gameSlice";
import { ALL_GAME_SETTINGS } from "./constants";
import StatusPanel from "./components/StatusPanel";
import {
  changeStatus,
  selectCurrentStatus,
  StatusEnum,
} from "./redux/statusSlice";
import { changeSetup, selectSetup } from "./redux/settingsSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(generateGame({ gameSettings: ALL_GAME_SETTINGS.beginner }));
  }, [dispatch]);

  const gameBoardLayout = useSelector(select);
  const currentStatus = useSelector(selectCurrentStatus);
  const gameSettings = useSelector(selectSetup);

  if (gameBoardLayout.length > 0 && currentStatus === StatusEnum.setup) {
    dispatch(changeStatus(StatusEnum.playing));
  }

  return (
    <div className="App flex flex-col justify-center items-center">
      <SettingsSelector />
      <div className="flex flex-col">
        <StatusPanel />
        <GameBoard gameBoardLayout={gameBoardLayout} />
        <button
          type="button"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => {
            dispatch(generateGame({ gameSettings }));
            dispatch(changeStatus(StatusEnum.setup));
          }}
        >
          New Game
        </button>
      </div>

    </div>
  );
}

export default App;
