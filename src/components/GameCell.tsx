import React from "react";
import styled from "styled-components";

const GameCellStyled = styled.div<{
  isHidden?: boolean;
  content?: CellContentEnum;
}>`
  box-shadow: ${({ isHidden }) =>
    isHidden ? "inset 0 0 5px 1px #000000" : "none"};
  color: ${({ content }) => {
    switch (content) {
      case CellContentEnum.MINE:
      case CellContentEnum.EXPLODED_MINE:
        return "red";
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

export interface GameCellProps {
  content: CellContentEnum;
  isHidden?: boolean;
  onClick: () => void;
}

const GameCell = ({ content, isHidden, onClick }: GameCellProps) => {
  return (
    <GameCellStyled
      onClick={onClick}
      isHidden={isHidden}
      content={content}
      className="w-5 h-5 border border-gray-800 flex items-center justify-center"
    >
      {isHidden ? "" : content}
    </GameCellStyled>
  );
};

export default GameCell;
