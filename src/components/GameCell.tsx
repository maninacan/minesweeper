import React from "react";
import styled from "styled-components";

const GameCellStyled = styled.div<{ isHidden?: boolean }>`
  box-shadow: ${({ isHidden }) =>
    isHidden ? "inset 0 0 5px 1px #000000" : "none"};
`;

export interface GameCellProps {
  content:
    | "mine"
    | "exploded-mine"
    | "empty"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9";
  isHidden: boolean;
}

const GameCell = ({ content, isHidden }: GameCellProps) => {
  return (
    <GameCellStyled
      isHidden={isHidden}
      className="w-5 h-5 border border-gray-800"
    />
  );
};

export default GameCell;
