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

const isPatternPossibleMemo = new Map([["", true]]);
/** @param {string[]} towels @param {string} pattern */
const isPatternPossible = (towels, pattern) =>
  towels.some((towel) => {
    if (pattern.startsWith(towel)) {
      const slice = pattern.slice(towel.length);
      if (!isPatternPossibleMemo.has(slice)) {
        isPatternPossibleMemo.set(slice, isPatternPossible(towels, slice));
      }
      return isPatternPossibleMemo.get(slice);
    }
    return false;
  });
/** @param {ReturnType<typeof parseInput>} input */
const part1 = ({ towels, patterns }) =>
  patterns.filter((pattern) => isPatternPossible(towels, pattern)).length;

const getPossibleTowelsMemo = new Map([["", 1]]);
/** @param {string[]} towels @param {string} pattern */
const getPossibleTowels = (towels, pattern) =>
  towels.reduce((acc, towel) => {
    if (pattern.startsWith(towel)) {
      const slice = pattern.slice(towel.length);
      if (!getPossibleTowelsMemo.has(slice)) {
        getPossibleTowelsMemo.set(slice, getPossibleTowels(towels, slice));
      }
      return acc + getPossibleTowelsMemo.get(slice);
    }
    return acc;
  }, 0);
/** @param {ReturnType<typeof parseInput>} input */
const part2 = ({ towels, patterns }) =>
  patterns.reduce(
    (acc, pattern) => acc + getPossibleTowels(towels, pattern),
    0,
  );

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
