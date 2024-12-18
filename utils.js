export const dirs = [
  { x: -1, y: 0 }, // north
  { x: 0, y: 1 }, // east
  { x: 1, y: 0 }, // south
  { x: 0, y: -1 }, // west
];
export const dirsD = [
  { x: 0, y: -1 }, // north
  { x: 1, y: -1 }, // north-east
  { x: 1, y: 0 }, // east
  { x: 1, y: 1 }, // south-east
  { x: 0, y: 1 }, // south
  { x: -1, y: 1 }, // south-west
  { x: -1, y: 0 }, // west
  { x: -1, y: -1 }, // north-west
];
export const dirsN = {
  north: { x: 0, y: -1 },
  "north-east": { x: 1, y: -1 },
  east: { x: 1, y: 0 },
  "south-east": { x: 1, y: 1 },
  south: { x: 0, y: 1 },
  "south-west": { x: -1, y: 1 },
  west: { x: -1, y: 0 },
  "north-west": { x: -1, y: -1 },
};
/** @param {any[][]} matrix*/
export function printMatrix(matrix) {
  console.log(matrix.map((row) => row.join("")).join("\n"));
}
/**
 * @param {number} rows
 * @param {number} cols
 * @param {any} value
 * @returns {any[][]}
 */
export function createMatrix(rows, cols, value = 0) {
  if (typeof value !== "function") {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => value),
    );
  }
  return Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => value(i, j)),
  );
}
