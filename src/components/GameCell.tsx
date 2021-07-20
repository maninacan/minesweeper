import React, { MouseEventHandler } from "react";
import styled from "styled-components";

export enum CellContentEnum {
  MINE = "x",
  EXPLODED_MINE = "X",
  EMPTY = "",
  ONE = 1,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
}

const GameCellStyled = styled.div<{
  isHidden?: boolean;
  isFlagged?: boolean;
  content?: CellContentEnum;
}>`
  box-shadow: ${({ isHidden }) =>
    isHidden ? "inset 0 0 5px 1px #000000" : "none"};
  color: ${({ content, isFlagged }) => {
    switch (content) {
      case CellContentEnum.MINE:
      case CellContentEnum.EXPLODED_MINE:
        return isFlagged ? "inherit": "red";
      case CellContentEnum.ONE:
        return "green";
      case CellContentEnum.TWO:
        return "blue";
      case CellContentEnum.THREE:
        return "teal";
      case CellContentEnum.FOUR:
        return "orange";
      case CellContentEnum.FIVE:
        return "pink";
      case CellContentEnum.SIX:
        return "purple";
      case CellContentEnum.SEVEN:
        return "light-green";
      case CellContentEnum.EIGHT:
        return "light-blue";
    }
  }};
`;

export interface GameCellProps {
  content: CellContentEnum;
  isHidden?: boolean;
  isFlagged?: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  onRightClick: MouseEventHandler<HTMLDivElement>;
}

const GameCell = ({
  content,
  isHidden,
  isFlagged,
  onClick,
  onRightClick,
}: GameCellProps) => {
  return (
    <GameCellStyled
      onClick={onClick}
      onContextMenu={onRightClick}
      isHidden={isHidden}
      isFlagged={isFlagged}
      content={content}
      className="w-5 h-5 border border-gray-800 flex items-center justify-center"
    >
      {isFlagged ? "F" : isHidden ? "" : content}
    </GameCellStyled>
  );
};

export default GameCell;
