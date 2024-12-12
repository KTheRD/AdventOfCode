const input = require("fs")
  .readFileSync("./input", "utf-8")
  .trim()
  .split("\n")
  .map((l) => l.split(""));

const regions = Array.from({ length: input.length }, () =>
  Array(input[0].length).fill(0),
);

const paintRegion = (x, y, region, id) => {
  if (x < 0 || x >= input.length || y < 0 || y >= input[0].length) return;
  if (regions[x][y] !== 0 || input[x][y] !== region) return;
  regions[x][y] = id;
  paintRegion(x - 1, y, region, id);
  paintRegion(x + 1, y, region, id);
  paintRegion(x, y - 1, region, id);
  paintRegion(x, y + 1, region, id);
};

const getArea = (id) => regions.flat().filter((r) => r === id).length;
const getPerimeter = (id) =>
  regions.reduce(
    (acc, row, x) =>
      acc +
      row.reduce((acc, region, y) => {
        if (region !== id) return acc;
        return (
          acc +
          Number(regions[x - 1]?.[y] !== region) +
          Number(regions[x + 1]?.[y] !== region) +
          Number(regions[x]?.[y - 1] !== region) +
          Number(regions[x]?.[y + 1] !== region)
        );
      }, 0),
    0,
  );
const getCost = (id) => getArea(id) * getPerimeter(id);
const getSides = (id) => {
  let sides = 0;
  for (let x = 0; x < regions.length; x++) {
    let continuousSide = false;
    // top side rows
    for (let y = 0; y < regions[0].length; y++) {
      if (regions[x][y] != id) {
        continuousSide = false;
        continue;
      }
      if (regions[x - 1]?.[y] === id) {
        continuousSide = false;
        continue;
      }
      if (regions[x][y] === id && regions[x - 1]?.[y] !== id) {
        if (!continuousSide) {
          sides++;
          continuousSide = true;
        }
      }
    }
    // bottom side rows
    continuousSide = false;
    for (let y = 0; y < regions[0].length; y++) {
      if (regions[x][y] != id) {
        continuousSide = false;
        continue;
      }
      if (regions[x + 1]?.[y] === id) {
        continuousSide = false;
        continue;
      }
      if (regions[x][y] === id && regions[x + 1]?.[y] !== id) {
        if (!continuousSide) {
          sides++;
          continuousSide = true;
        }
      }
    }
  }
  for (let y = 0; y < regions[0].length; y++) {
    // left side columns
    let continuousSide = false;
    for (let x = 0; x < regions.length; x++) {
      if (regions[x][y] != id) {
        continuousSide = false;
        continue;
      }
      if (regions[x]?.[y - 1] === id) {
        continuousSide = false;
        continue;
      }
      if (regions[x][y] === id && regions[x]?.[y - 1] !== id) {
        if (!continuousSide) {
          sides++;
          continuousSide = true;
        }
      }
    }
    // right side columns
    continuousSide = false;
    for (let x = 0; x < regions.length; x++) {
      if (regions[x][y] != id) {
        continuousSide = false;
        continue;
      }
      if (regions[x]?.[y + 1] === id) {
        continuousSide = false;
        continue;
      }
      if (regions[x][y] === id && regions[x]?.[y + 1] !== id) {
        if (!continuousSide) {
          sides++;
          continuousSide = true;
        }
      }
    }
  }
  return sides;
};
const getCost2 = (id) => getArea(id) * getSides(id);

let currentRegion = 1;
for (let x = 0; x < input.length; x++) {
  for (let y = 0; y < input[0].length; y++) {
    if (regions[x][y] === 0) {
      paintRegion(x, y, input[x][y], currentRegion);
      currentRegion++;
    }
  }
}

const totalRegions = currentRegion - 1;
let totalCost = 0;
for (let i = 1; i <= totalRegions; i++) {
  totalCost += getCost(i);
}
console.log(totalCost);
let totalCost2 = 0;
for (let i = 1; i <= totalRegions; i++) {
  totalCost2 += getCost2(i);
}
console.log(totalCost2);
