import { createSlice } from "@reduxjs/toolkit";
import { CellLayout } from "../components/GameBoard";
import {
  CardinalDirectionsEnum,
  generateGameBoardLayout,
  getNeighboringCells,
} from "../utils/helper";
import { RootState } from "./store";
import { CellContentEnum } from "../components/GameCell";

export const reducerName = "game";

export type CellCoordinates = {
  row: number;
  column: number;
};

// Define the initial state using that type
const initialState: CellLayout[][] = [];

const revealNeighborsThatAreEmpty = (
  layout: CellLayout[][],
  currentCellCoordinates: CellCoordinates,
  previousCellDirection?: CardinalDirectionsEnum | undefined
) => {
  const currentCell: CellLayout =
    layout[currentCellCoordinates.row][currentCellCoordinates.column];
  if (currentCell.content === CellContentEnum.EMPTY) {
    currentCell.isHidden = false;
    const neighboringCells = getNeighboringCells(
      layout,
      currentCellCoordinates
    );

    // Reveal northern neighboring cell if it is empty and check it's neighbors
    if (
      previousCellDirection !== CardinalDirectionsEnum.NORTH &&
      neighboringCells.north()?.isHidden
    ) {
      if (neighboringCells.north()?.content === CellContentEnum.EMPTY) {
        revealNeighborsThatAreEmpty(
          layout,
          {
            row: currentCellCoordinates.row - 1,
            column: currentCellCoordinates.column,
          },
          CardinalDirectionsEnum.SOUTH
        );
      }

      if (typeof neighboringCells.northWest()?.content === "number") {
        neighboringCells.northWest().isHidden = false;
      }

      if (typeof neighboringCells.north()?.content === "number") {
        neighboringCells.north().isHidden = false;
      }

      if (typeof neighboringCells.northEast()?.content === "number") {
        neighboringCells.northEast().isHidden = false;
      }
    }

    // Reveal eastern neighboring cell if it is empty and check it's neighbors
    if (
      previousCellDirection !== CardinalDirectionsEnum.EAST &&
      neighboringCells.east()?.isHidden
    ) {
      if (neighboringCells.east()?.content === CellContentEnum.EMPTY) {
        revealNeighborsThatAreEmpty(
          layout,
          {
            row: currentCellCoordinates.row,
            column: currentCellCoordinates.column + 1,
          },
          CardinalDirectionsEnum.WEST
        );
      }
      if (typeof neighboringCells.east()?.content === "number") {
        neighboringCells.east().isHidden = false;
      }
    }

    // Reveal southern neighboring cell if it is empty and check it's neighbors
    if (
      previousCellDirection !== CardinalDirectionsEnum.SOUTH &&
      neighboringCells.south()?.isHidden
    ) {
      if (neighboringCells.south()?.content === CellContentEnum.EMPTY) {
        revealNeighborsThatAreEmpty(
          layout,
          {
            row: currentCellCoordinates.row + 1,
            column: currentCellCoordinates.column,
          },
          CardinalDirectionsEnum.NORTH
        );
      }

      if (typeof neighboringCells.southWest()?.content === "number") {
        neighboringCells.southWest().isHidden = false;
      }

      if (typeof neighboringCells.south()?.content === "number") {
        neighboringCells.south().isHidden = false;
      }

      if (typeof neighboringCells.southEast()?.content === "number") {
        neighboringCells.southEast().isHidden = false;
      }
    }

    // Reveal western neighboring cell if it is empty and check it's neighbors
    if (
      previousCellDirection !== CardinalDirectionsEnum.WEST &&
      neighboringCells.west()?.isHidden
    ) {
      if (neighboringCells.west()?.content === CellContentEnum.EMPTY) {
        revealNeighborsThatAreEmpty(
          layout,
          {
            row: currentCellCoordinates.row,
            column: currentCellCoordinates.column - 1,
          },
          CardinalDirectionsEnum.EAST
        );
      }
      if (typeof neighboringCells.west()?.content === "number") {
        neighboringCells.west().isHidden = false;
      }
    }
  }
};

const getNumCells = (layout: CellLayout[][], type?: CellContentEnum) => {
  if (!type) {
    return layout.length * (layout.length ? layout[0].length : 1);
  } else {
    let count = 0;

    layout.forEach((row) =>
      row.forEach((cell) => {
        if (cell.content === type) {
          count++;
        }
      })
    );

    return count;
  }
};

const getNumRevealedCells = (layout: CellLayout[][]) => {
  let count = 0;

  layout.forEach((row) =>
    row.forEach((cell) => {
      if (!cell.isHidden) {
        count++;
      }
    })
  );

  return count;
};

export const gameSlice = createSlice({
  name: reducerName,
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    generateGame: (state, action) => {
      state = generateGameBoardLayout(action.payload.gameSettings);
      return state;
    },
    revealCell: (
      state,
      action: { payload: { column: number; row: number } }
    ) => {
      state[action.payload.row][action.payload.column].isHidden = false;
      return state;
    },
    revealAllMines: (state, action) => {
      // Set all cells with mines to isHidden = false;
      state.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
          if (cell.content === CellContentEnum.MINE) {
            cell.isHidden = false;
          }
        });
      });

      // Set clicked-on cell to content = Exploded Mine
      state[action.payload.currentSelectionCoordinates.row][
        action.payload.currentSelectionCoordinates.column
      ].content = CellContentEnum.EXPLODED_MINE;
    },
    revealNeighboringEmptyCells: (state, action) => {
      revealNeighborsThatAreEmpty(state, action.payload.currentCellCoordinates);
    },
    changeFlagStatus: (state, action) => {
      state[action.payload.row][action.payload.column].isFlagged =
        action.payload.flagStatus;
      return state;
    },
  },
});

export const {
  generateGame,
  revealCell,
  revealAllMines,
  revealNeighboringEmptyCells,
  changeFlagStatus,
} = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const select = (state: RootState) => state.game;
export const selectIsHidden = (state: RootState, coords: CellCoordinates) =>
  select(state);
export const selectNumLeftToClear = (state: RootState) => {
  const layout = select(state);
  return (
    getNumCells(layout) -
    getNumCells(layout, CellContentEnum.MINE) -
    getNumRevealedCells(layout)
  );
};
export const selectNumMines = (state: RootState) => {
  return getNumCells(select(state), CellContentEnum.MINE);
};

export default gameSlice.reducer;
