import { CellLayout } from "../components/GameBoard";
import { CellContentEnum } from "../components/GameCell";

export const generateGameBoardLayout = (): CellLayout[][] => {
  return [
    [
      { content: CellContentEnum.EMPTY, isHidden: true },
      { content: CellContentEnum.EMPTY, isHidden: true },
      { content: CellContentEnum.EMPTY, isHidden: true },
    ],
    [
      { content: CellContentEnum.MINE, isHidden: true },
      { content: CellContentEnum.EMPTY, isHidden: true },
      { content: CellContentEnum.EMPTY, isHidden: true },
    ],
    [
      { content: CellContentEnum.EMPTY, isHidden: true },
      { content: CellContentEnum.EMPTY, isHidden: true },
      { content: CellContentEnum.EMPTY, isHidden: true },
    ],
  ];
};
