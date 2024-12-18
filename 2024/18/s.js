import { readFileSync } from "fs";
import { getMatrix } from "../../utils.js";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  return input.split("\n").map((line) => line.split(",").map(Number));
}

/** @param {number[][]} input */
function part1(input) {
  const map = getMatrix(71, 71, 0);
  for (let i = 0; i < 1024; i++) {
    const [x, y] = input[i];
    map[y][x] = -1;
  }
  let queue = [[0, 0, 0]];
  while (queue.length) {
    const newQueue = [];
    for (const [x, y, steps] of queue) {
      if (x < 0 || x > 70 || y < 0 || y > 70 || map[y][x]) {
        continue;
      }
      if (x === 70 && y === 70) {
        return steps;
      }
      map[y][x] = steps;
      newQueue.push([x + 1, y, steps + 1]);
      newQueue.push([x - 1, y, steps + 1]);
      newQueue.push([x, y + 1, steps + 1]);
      newQueue.push([x, y - 1, steps + 1]);
    }
    queue = newQueue;
  }
  return "No path found";
}

/** @param {number[][]} input */
function part2(input) {
  const map = getMatrix(71, 71, 0);
  outer: for (let i = 0; i < input.length; i++) {
    const [x, y] = input[i];
    map[y][x] = -1;
    let queue = [[0, 0]];
    while (queue.length) {
      const newQueue = [];
      for (const [x, y] of queue) {
        if (
          x < 0 ||
          x > 70 ||
          y < 0 ||
          y > 70 ||
          map[y][x] === -1 ||
          map[y][x] === i + 1
        ) {
          continue;
        }
        if (x === 70 && y === 70) {
          continue outer;
        }
        map[y][x] = i + 1;
        newQueue.push([x + 1, y]);
        newQueue.push([x - 1, y]);
        newQueue.push([x, y + 1]);
        newQueue.push([x, y - 1]);
      }
      queue = newQueue;
    }
    return `${x},${y}`;
  }
  return "No block found";
}

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
