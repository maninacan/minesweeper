import { useDispatch, useSelector } from "react-redux";
import GameBoard from "./components/GameBoard";
import "./App.scss";
import { generateGame, select } from "./redux/gameSlice";
import { useEffect } from "react";
import { ALL_GAME_SETTINGS } from "./constants";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(generateGame({ gameSettings: ALL_GAME_SETTINGS.beginner }));
  }, [dispatch]);

  const gameBoardLayout = useSelector(select);
  return (
    <div className="App">
      <GameBoard gameBoardLayout={gameBoardLayout} />
    </div>
  );
}

export default App;
