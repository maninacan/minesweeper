import { CellLayout } from "../components/GameBoard";
import { CellContentEnum } from "../components/GameCell";
import { GAME_SETTINGS } from "../constants";
import { CellCoordinates } from "../redux/gameSlice";

const shouldRandomlyPlaceMine = (numCells: number, numMines: number) => {
  const ratio = numMines / numCells;
  const threshold = ratio * 100;
  const randomNumber = Math.random() * 100;
  return randomNumber <= threshold;
};

export enum CardinalDirectionsEnum {
  NORTH_WEST = "northWest",
  NORTH = "north",
  NORTH_EAST = "northEast",
  WEST = "west",
  EAST = "east",
  SOUTH_WEST = "southWest",
  SOUTH = "south",
  SOUTH_EAST = "southEast",
}

export type NeighboringCellMethodMap = {
  [CardinalDirectionsEnum.NORTH_WEST]: () => CellLayout;
  [CardinalDirectionsEnum.NORTH]: () => CellLayout;
  [CardinalDirectionsEnum.NORTH_EAST]: () => CellLayout;
  [CardinalDirectionsEnum.WEST]: () => CellLayout;
  [CardinalDirectionsEnum.EAST]: () => CellLayout;
  [CardinalDirectionsEnum.SOUTH_WEST]: () => CellLayout;
  [CardinalDirectionsEnum.SOUTH]: () => CellLayout;
  [CardinalDirectionsEnum.SOUTH_EAST]: () => CellLayout;
};

export const getNeighboringCells = (
  layout: CellLayout[][],
  centerCellCoords: CellCoordinates
): NeighboringCellMethodMap => ({
  northWest: () => {
    return layout[centerCellCoords.row - 1]?.[centerCellCoords.column - 1];
  },
  north: () => {
    return layout[centerCellCoords.row - 1]?.[centerCellCoords.column];
  },
  northEast: () => {
    return layout[centerCellCoords.row - 1]?.[centerCellCoords.column + 1];
  },
  west: () => {
    return layout[centerCellCoords.row]?.[centerCellCoords.column - 1];
  },
  east: () => {
    return layout[centerCellCoords.row]?.[centerCellCoords.column + 1];
  },
  southWest: () => {
    return layout[centerCellCoords.row + 1]?.[centerCellCoords.column - 1];
  },
  south: () => {
    return layout[centerCellCoords.row + 1]?.[centerCellCoords.column];
  },
  southEast: () => {
    return layout[centerCellCoords.row + 1]?.[centerCellCoords.column + 1];
  },
});

export const getNeighboringMineCount = (
  layout: CellLayout[][],
  centerCellCoordinates: CellCoordinates
): CellContentEnum => {
  const neighboringCells = getNeighboringCells(layout, centerCellCoordinates);
  let mineCount = 0;

  if (neighboringCells.northWest()?.content === CellContentEnum.MINE) {
    mineCount++;
  }
  if (neighboringCells.north()?.content === CellContentEnum.MINE) {
    mineCount++;
  }
  if (neighboringCells.northEast()?.content === CellContentEnum.MINE) {
    mineCount++;
  }
  if (neighboringCells.west()?.content === CellContentEnum.MINE) {
    mineCount++;
  }
  if (neighboringCells.east()?.content === CellContentEnum.MINE) {
    mineCount++;
  }
  if (neighboringCells.southWest()?.content === CellContentEnum.MINE) {
    mineCount++;
  }
  if (neighboringCells.south()?.content === CellContentEnum.MINE) {
    mineCount++;
  }
  if (neighboringCells.southEast()?.content === CellContentEnum.MINE) {
    mineCount++;
  }

  switch (mineCount) {
    case 0:
      return CellContentEnum.EMPTY;
    case 1:
      return CellContentEnum.ONE;
    case 2:
      return CellContentEnum.TWO;
    case 3:
      return CellContentEnum.THREE;
    case 4:
      return CellContentEnum.FOUR;
    case 5:
      return CellContentEnum.FIVE;
    case 6:
      return CellContentEnum.SIX;
    case 7:
      return CellContentEnum.SEVEN;
    case 8:
      return CellContentEnum.EIGHT;
    default:
      return CellContentEnum.EMPTY;
  }
};

export const generateGameBoardLayout = (
  gameSettings: GAME_SETTINGS
): CellLayout[][] => {
  const numCells = gameSettings.width * gameSettings.height;
  if (gameSettings.mines >= numCells) {
    throw Error("There has to be at least one cell without a mine in it.");
  }

  // Generate basic layout
  let layout: CellLayout[][] = new Array(gameSettings.height)
    .fill(null)
    .map(() =>
      new Array(gameSettings.width).fill(null).map(() => ({
        content: CellContentEnum.EMPTY,
        isHidden: true,
        isFlagged: false
      }))
    );

  // Add mines to layout
  let placedMineCount = 0;
  while (placedMineCount < gameSettings.mines) {
    layout.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (
          cell.content === CellContentEnum.MINE ||
          placedMineCount === gameSettings.mines
        ) {
          // Do nothing
        } else if (shouldRandomlyPlaceMine(numCells, gameSettings.mines)) {
          placedMineCount++;
          layout[rowIndex][columnIndex].content = CellContentEnum.MINE;
        }
      });
    });
  }

  // Add numbers to appropriate boxes
  layout.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (cell.content === CellContentEnum.MINE) {
        // Do nothing
      } else {
        layout[rowIndex][columnIndex].content = getNeighboringMineCount(
          layout,
          { row: rowIndex, column: columnIndex }
        );
      }
    });
  });

  return layout;
};
