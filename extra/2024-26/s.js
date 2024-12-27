import { readFileSync } from "fs";
import { dirs } from "../../utils.js";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  const [outerStr, innerStr] = input.split("\n\n");
  const outerSide = outerStr.split("| ")[0].split(" ").length;
  const innerSide = innerStr.split("| ")[0].split(" ").length;
  const outer = { left: [], right: [] };
  for (const line of outerStr.split("\n")) {
    const [left, right] = line.split(" | ");
    outer.left.push(left.split(" ").map(Number));
    outer.right.push(right.split(" ").map(Number));
  }
  const inner = { left: [], right: [] };
  for (const line of innerStr.split("\n")) {
    const [left, right] = line.split(" | ");
    inner.left.push(left.split(" ").map(Number));
    inner.right.push(right.split(" ").map(Number));
  }
  return { outer, inner };
}

/**
 * @param {ReturnType<typeof parseInput>} input
 * @param {number} x
 * @param {number} y
 * @param {boolean} isOuter
 * @param {boolean} isLeft
 */
const getNeighbours = ({ inner, outer }, x, y, isOuter, isLeft) => {
  const neighbours = [];
  if (y > 0) {
    neighbours.push({ x, y: y - 1, isOuter, isLeft });
  }
  if (isOuter) {
    if (y < outer.left.length - 1) {
      neighbours.push({ x, y: y + 1, isOuter, isLeft });
    }
  } else {
    if (y < inner.left.length - 1) {
      neighbours.push({ x, y: y + 1, isOuter, isLeft });
    }
  }

  if (isLeft) {
    if (x > 0) {
      neighbours.push({ x: x - 1, y, isOuter, isLeft: false });
    }
  }
};

/** @param {ReturnType<typeof parseInput>} input */
function solve({ outer, inner }) {

}

console.log(solve(parseInput(input)));
