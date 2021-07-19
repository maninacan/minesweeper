import { useSelector } from "react-redux";
import GameBoard from "./components/GameBoard";
import "./App.scss";
import { select } from "./redux/gameSlice";

function App() {
  const gameBoardLayout = useSelector(select);
  return (
    <div className="App">
      <GameBoard gameBoardLayout={gameBoardLayout} />
    </div>
  );
}

export default App;
