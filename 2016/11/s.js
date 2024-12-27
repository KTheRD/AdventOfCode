import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  const floorsStr = input.split("\n");
  return floorsStr.map((floor) => {
    const floorItems = floor.match(/([\w-]+)(?= microchip| generator)/g);
    if (!floorItems) return new Set();
    return new Set(
      floorItems.map((item) => {
        const [element, compatible] = item.split("-");
        if (compatible) return `${element} microchip`;
        return `${element} generator`;
      }),
    );
  });
}

/** @param {ReturnType<typeof parseInput>} input */
function part1(input) {
  console.log(input);
}

/** @param {ReturnType<typeof parseInput>} input */
function part2(input) {}

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
