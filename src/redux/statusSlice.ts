import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export const reducerName = "status";

export enum StatusEnum {
  playing = "playing",
  lost = "lost",
  won = "won",
  setup = "setup"
}

interface StatusState {
  current: StatusEnum;
}

const initialState: StatusState = {
  current: StatusEnum.setup,
};

export const statusSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<StatusEnum>) => {
      state.current = action.payload;
    },
  },
});

export const { changeStatus } = statusSlice.actions;

export const select = (state: RootState) => state.status;
export const selectCurrentStatus = (state: RootState) => select(state)?.current;

export default statusSlice.reducer;
