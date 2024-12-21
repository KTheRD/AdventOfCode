import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  return input.split("\n");
}

const keypad = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  [null, "0", "A"],
];
const keyboard = [
  [null, "^", "A"],
  ["<", "v", ">"],
];

/**
 * @param {string[][]} map
 * @param {number} startX
 * @param {number} endX
 * @param {number} startY
 * @param {number} endY
 * @param {string} path
 */
const dfs = (map, startX, endX, startY, endY, path = "") => {
  if (startX === endX && startY === endY) return [path];
  if (startX < 0 || startX >= map[0].length) return [];
  if (startY < 0 || startY >= map.length) return [];
  if (map[startY][startX] === null) return [];
  const possiblePaths = [];
  if (startX > endX) {
    possiblePaths.push(...dfs(map, startX - 1, endX, startY, endY, path + "<"));
  } else if (startX < endX) {
    possiblePaths.push(...dfs(map, startX + 1, endX, startY, endY, path + ">"));
  }
  if (startY > endY) {
    possiblePaths.push(...dfs(map, startX, endX, startY - 1, endY, path + "^"));
  } else if (startY < endY) {
    possiblePaths.push(...dfs(map, startX, endX, startY + 1, endY, path + "v"));
  }
  const minimalPath = Math.min(...possiblePaths.map((path) => path.length));
  return possiblePaths.filter((path) => path.length === minimalPath);
};

/** @returns {Record<string, Record<string, string[]>>} */
const getAllKeyboardPaths = () =>
  keyboard.reduce(
    (acc, row, startY) => ({
      ...acc,
      ...row.reduce((acc, start, startX) => {
        if (start === null) return acc;
        return {
          ...acc,
          [start]: keyboard.reduce(
            (acc, row2, endY) => ({
              ...acc,
              ...row2.reduce((acc, end, endX) => {
                if (end === null) return acc;
                if (startX === endX && startY === endY)
                  return { ...acc, [end]: [""] };
                return {
                  ...acc,
                  [end]: dfs(keyboard, startX, endX, startY, endY),
                };
              }, {}),
            }),
            {},
          ),
        };
      }, {}),
    }),
    {},
  );
const keyboardPaths = getAllKeyboardPaths();
/** @returns {Record<string, Record<string, string[]>>} */
const getAllKeypadPaths = () =>
  keypad.reduce(
    (acc, row, startY) => ({
      ...acc,
      ...row.reduce((acc, start, startX) => {
        if (start === null) return acc;
        return {
          ...acc,
          [start]: keypad.reduce(
            (acc, row2, endY) => ({
              ...acc,
              ...row2.reduce((acc, end, endX) => {
                if (end === null) return acc;
                if (startX === endX && startY === endY)
                  return { ...acc, [end]: [""] };
                return {
                  ...acc,
                  [end]: dfs(keypad, startX, endX, startY, endY),
                };
              }, {}),
            }),
            {},
          ),
        };
      }, {}),
    }),
    {},
  );
const keypadPaths = getAllKeypadPaths();

const memo = new Map();
/**
 * @param {string} path
 * @param {number} n
 */
const shortestPathAfterN = (path, n) => {
  if (n === 0) return path.length;
  const subPaths = path.split(/A+/).map((subPath) => subPath + "A");
  subPaths.pop();
  const Acount = path.match(/A/g).length - subPaths.length;
  let result = 0;
  for (const subPath of subPaths) {
    if (memo.has(n + subPath)) {
      result += memo.get(n + subPath);
      continue;
    }
    let possiblePaths = [""];
    let position = "A";
    for (const char of subPath) {
      possiblePaths = possiblePaths.flatMap((path) =>
        keyboardPaths[position][char].map((next) => path + next + "A"),
      );
      position = char;
    }
    result += possiblePaths.reduce((acc, path) => {
      const pathLength = shortestPathAfterN(path, n - 1);
      if (pathLength < acc) {
        memo.set(n + subPath, pathLength);
        return pathLength;
      }
      return acc;
    }, Infinity);
  }
  result += Acount;
  return result;
};

/**
 * @param {ReturnType<typeof parseInput>} input
 * @param {number} n
 */
function solve(input, n) {
  return input
    .map((code) => {
      let paths = [""];
      let position = "A";
      for (const char of code) {
        paths = paths.flatMap((path) =>
          keypadPaths[position][char].map((next) => path + next + "A"),
        );
        position = char;
      }
      return (
        paths.reduce((acc, path) => {
          const pathLength = shortestPathAfterN(path, n);
          if (pathLength < acc) return pathLength;
          return acc;
        }, Infinity) * Number.parseInt(code)
      );
    })
    .reduce((a, b) => a + b, 0);
}
console.log(solve(parseInput(input), 2));
console.log(solve(parseInput(input), 25));
