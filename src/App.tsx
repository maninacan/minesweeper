import "./App.scss";
import GameBoard, { CellLayout } from "./components/GameBoard";
import { generateGameBoardLayout } from "./utils/helper";

const gameBoardLayout: CellLayout[][] = generateGameBoardLayout();

function App() {
  return (
    <div className="App">
      <GameBoard gameBoardLayout={gameBoardLayout} />
    </div>
  );
}

export default App;
