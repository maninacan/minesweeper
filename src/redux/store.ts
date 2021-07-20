import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import settingsReducer from "./settingsSlice";
import statusReducer from "./statusSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    settings: settingsReducer,
    status: statusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
