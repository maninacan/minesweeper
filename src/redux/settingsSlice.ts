import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import {GAME_SETTINGS, ALL_GAME_SETTINGS} from "../constants";

export const reducerName = "settings"

// Define a type for the slice state
interface SettingsState {
  setup: GAME_SETTINGS;
}

// Define the initial state using that type
const initialState: SettingsState = {
  setup: ALL_GAME_SETTINGS.beginner
};

export const settingsSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    changeSetup: (state, action: PayloadAction<GAME_SETTINGS>) => {
      state.setup = action.payload;

    },
  },
});

export const { changeSetup } = settingsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const select = (state: RootState) => state.settings;
export const selectSetup = (state: RootState) => select(state)?.setup;

export default settingsSlice.reducer;
