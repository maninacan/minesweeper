export type GAME_SETTINGS = {
  name: string;
  height: number;
  width: number;
  mines: number;
};

export type GAME_SETTINGS_SELECTIONS = {
  beginner: GAME_SETTINGS;
  intermediate: GAME_SETTINGS;
  expert: GAME_SETTINGS;
  custom: GAME_SETTINGS;
};

export const ALL_GAME_SETTINGS: GAME_SETTINGS_SELECTIONS = {
  beginner: {
    name: "Beginner",
    height: 9,
    width: 9,
    mines: 10,
  },
  intermediate: {
    name: "Intermediate",
    height: 16,
    width: 16,
    mines: 40,
  },
  expert: {
    name: "Expert",
    height: 16,
    width: 30,
    mines: 99,
  },
  custom: {
    name: "Custom",
    height: 20,
    width: 30,
    mines: 145,
  },
};
