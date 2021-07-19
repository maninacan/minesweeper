import React from "react";
import styled from "styled-components";

const GameCellStyled = styled.div<{ isHidden?: boolean }>`
  box-shadow: ${({ isHidden }) =>
    isHidden ? "inset 0 0 5px 1px #000000" : "none"};
`;

export enum CellContentEnum {
  MINE = "MINE",
  EXPLODED_MINE = "EXPLODED_MINE",
  EMPTY = "EMPTY",
  ONE = 1,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
}

export interface GameCellProps {
  content: CellContentEnum;
  isHidden?: boolean;
  onClick: () => {};
}

const GameCell = ({ content, isHidden, onClick }: GameCellProps) => {
  return (
    <GameCellStyled
      onClick={onClick}
      isHidden={isHidden}
      className="w-5 h-5 border border-gray-800"
    />
  );
};

export default GameCell;
