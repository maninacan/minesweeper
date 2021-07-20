import { getNeighboringCells } from "./helper";
import { CellLayout } from "../components/GameBoard";
import { CellContentEnum } from "../components/GameCell";

describe("helpers", () => {
  describe("getNeighboringCell", () => {
    test("Should work when it has neighbors in all directions", () => {
      const layout: CellLayout[][] = [
        [
          { content: CellContentEnum.ONE, isHidden: true },
          { content: CellContentEnum.TWO, isHidden: true },
          { content: CellContentEnum.THREE, isHidden: true },
        ],
        [
          { content: CellContentEnum.FOUR, isHidden: true },
          { content: CellContentEnum.MINE, isHidden: true },
          { content: CellContentEnum.FIVE, isHidden: true },
        ],
        [
          { content: CellContentEnum.SIX, isHidden: true },
          { content: CellContentEnum.SEVEN, isHidden: true },
          { content: CellContentEnum.EIGHT, isHidden: true },
        ],
      ];

      const neighboringCells = getNeighboringCells(layout, {
        row: 1,
        column: 1,
      });

      expect(neighboringCells.northWest()).toEqual({
        content: CellContentEnum.ONE,
        isHidden: true,
      });
      expect(neighboringCells.north()).toEqual({
        content: CellContentEnum.TWO,
        isHidden: true,
      });
      expect(neighboringCells.northEast()).toEqual({
        content: CellContentEnum.THREE,
        isHidden: true,
      });
      expect(neighboringCells.west()).toEqual({
        content: CellContentEnum.FOUR,
        isHidden: true,
      });
      expect(neighboringCells.east()).toEqual({
        content: CellContentEnum.FIVE,
        isHidden: true,
      });
      expect(neighboringCells.southWest()).toEqual({
        content: CellContentEnum.SIX,
        isHidden: true,
      });
      expect(neighboringCells.south()).toEqual({
        content: CellContentEnum.SEVEN,
        isHidden: true,
      });
      expect(neighboringCells.southEast()).toEqual({
        content: CellContentEnum.EIGHT,
        isHidden: true,
      });
    });

    test("Should work when it has no neighbors", () => {
      const layout: CellLayout[][] = [
        [{ content: CellContentEnum.MINE, isHidden: true }],
      ];

      const neighboringCells = getNeighboringCells(layout, {
        row: 0,
        column: 0,
      });

      expect(neighboringCells.northWest()).toEqual(undefined);
      expect(neighboringCells.north()).toEqual(undefined);
      expect(neighboringCells.northEast()).toEqual(undefined);
      expect(neighboringCells.west()).toEqual(undefined);
      expect(neighboringCells.east()).toEqual(undefined);
      expect(neighboringCells.southWest()).toEqual(undefined);
      expect(neighboringCells.south()).toEqual(undefined);
      expect(neighboringCells.southEast()).toEqual(undefined);
    });
  });
});
