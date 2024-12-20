import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  return input.split("\n").map((line) => line.split(""));
}

/** @param {ReturnType<typeof parseInput>} input */
function solve(input) {
  const start = { x: 0, y: 0 };
  outer: for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === "S") {
        start.x = j;
        start.y = i;
        break outer;
      }
    }
  }
  const end = { x: 0, y: 0 };
  outer: for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === "E") {
        end.x = j;
        end.y = i;
        break outer;
      }
    }
  }
  let count = 0;
  let queue = [start];
  /** @type Map<string, Number> */
  const path = new Map();
  outer: while (queue.length > 0) {
    const newQueue = [];
    for (const start of queue) {
      if (input[start.y][start.x] === "#") {
        continue;
      }

      if (path.has(start.x + "," + start.y)) {
        continue;
      }
      path.set(start.x + "," + start.y, count);
      if (start.x === end.x && start.y === end.y) {
        break outer;
      }
      newQueue.push({ x: start.x + 1, y: start.y });
      newQueue.push({ x: start.x - 1, y: start.y });
      newQueue.push({ x: start.x, y: start.y + 1 });
      newQueue.push({ x: start.x, y: start.y - 1 });
    }
    count++;
    queue = newQueue;
  }

  let gold = 0;
  let silver = 0;
  for (const [coords, distance] of path) {
    const [x, y] = coords.split(",").map(Number);
    for (let i = -20; i <= 20; i++) {
      for (let j = -20; j <= 20; j++) {
        if (Math.abs(i) + Math.abs(j) > 20) {
          continue;
        }
        if (input[y + i]?.[x + j] === "#") {
          continue;
        }
        if (
          path.get(x + j + "," + (y + i)) -
            Math.abs(i) -
            Math.abs(j) -
            distance >=
          100
        ) {
          if (Math.abs(i) + Math.abs(j) == 2) {
            silver++;
          }
          gold++;
        }
      }
    }
  }
  return [silver, gold].join("\n");
}

console.log(solve(parseInput(input)));
