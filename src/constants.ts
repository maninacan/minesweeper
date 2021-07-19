export type GAME_SETTINGS = {
  height: number;
  width: number;
  mines: number;
};

export type GAME_SETTINGS_SELECTIONS = {
  beginner: GAME_SETTINGS;
  intermediate: GAME_SETTINGS;
  expert: GAME_SETTINGS;
};

export const ALL_GAME_SETTINGS: GAME_SETTINGS_SELECTIONS = {
  beginner: {
    height: 9,
    width: 9,
    mines: 10,
  },
  intermediate: {
    height: 16,
    width: 16,
    mines: 40,
  },
  expert: {
    height: 16,
    width: 30,
    mines: 99,
  },
};
