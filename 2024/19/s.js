import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  const [towels, patterns] = input.split("\n\n");
  return {
    towels: towels.split(", "),
    patterns: patterns.split("\n"),
  };
}

const isPatternPossibleMemo = new Map();
/** @param {string[]} towels @param {string} pattern */
const isPatternPossible = (towels, pattern) => {
  if (pattern === "") {
    return true;
  }
  return towels.reduce((acc, towel) => {
    if (pattern.startsWith(towel)) {
      const slice = pattern.slice(towel.length);
      if (!isPatternPossibleMemo.has(slice)) {
        isPatternPossibleMemo.set(slice, isPatternPossible(towels, slice));
      }
      return acc || isPatternPossibleMemo.get(slice);
    }
    return acc;
  }, false);
};
/** @param {ReturnType<typeof parseInput>} input */
function part1({ towels, patterns }) {
  return patterns.filter((pattern) => isPatternPossible(towels, pattern))
    .length;
}

const getPossibleTowelsMemo = new Map();
/** @param {string[]} towels @param {string} pattern */
const getPossibleTowels = (towels, pattern) => {
  if (pattern === "") {
    return 1;
  }
  return towels.reduce((acc, towel) => {
    if (pattern.startsWith(towel)) {
      const slice = pattern.slice(towel.length);
      if (!getPossibleTowelsMemo.has(slice)) {
        getPossibleTowelsMemo.set(slice, getPossibleTowels(towels, slice));
      }
      return acc + getPossibleTowelsMemo.get(slice);
    }
    return acc;
  }, 0);
};
/** @param {ReturnType<typeof parseInput>} input */
function part2({ towels, patterns }) {
  return patterns.reduce(
    (acc, pattern) => acc + getPossibleTowels(towels, pattern),
    0,
  );
}

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
