import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  const locksOrKeys = input
    .split("\n\n")
    .map((x) => x.split("\n").map((y) => y.split("")));
  const locks = locksOrKeys
    .filter((x) => x[0][0] === "#")
    .map((lock) => {
      const result = [];
      for (const row of lock) {
        for (let i = 0; i < row.length; i++) {
          if (row[i] === "#") {
            result[i] = (result[i] ?? 0) + 1;
          }
        }
      }
      return result;
    });
  const keys = locksOrKeys
    .filter((x) => x[0][0] === ".")
    .map((key) => {
      const result = [0, 0, 0, 0, 0];
      for (const row of key) {
        for (let i = 0; i < row.length; i++) {
          if (row[i] === "#") {
            result[i] = (result[i] ?? 0) + 1;
          }
        }
      }
      return result;
    });
  return { locks, keys };
}

/** @param {ReturnType<typeof parseInput>} input */
function part1({ locks, keys }) {
  let count = 0;
  for (const lock of locks) {
    for (const key of keys) {
      if (lock.every((x, i) => x + key[i] <= 7)) {
        count++;
      }
    }
  }
  return count;
}

console.log(part1(parseInput(input)));
