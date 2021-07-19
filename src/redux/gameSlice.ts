import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CellLayout } from "../components/GameBoard";
import { generateGameBoardLayout } from "../utils/helper";
import {RootState} from "./store";

export const reducerName = "game";

export type CellCoordinates = {
  row: number;
  column: number;
};

// Define the initial state using that type
const initialState: CellLayout[][] = generateGameBoardLayout();

export const gameSlice = createSlice({
  name: reducerName,
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    revealCell: (state, action: { payload: { column: number; row: number } }) => {
      debugger;
      state[action.payload.row][action.payload.column].isHidden = false;
    },
  },
});

export const { revealCell } = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const select = (state: RootState) => state.game;
export const selectIsHidden = (state: RootState, coords: CellCoordinates) => select(state)

export default gameSlice.reducer;
