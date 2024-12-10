const input = require("fs")
  .readFileSync("./input", "utf-8")
  .trim()
  .split("\n")
  .map((l) => l.split("").map(Number));
// const input = `89011123
// 78121874
// 87431965
// 96549874
// 45678913
// 32119112
// 11329811
// 11456732`
//   .split("\n")
//   .map((l) => l.split("").map(Number));

const dirs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const getScore = (i, j, visited, next = 1) => {
  if (next === 10) {
    if (visited.has(`${i},${j}`)) {
      return 0;
    }
    visited.add(`${i},${j}`);
    return 1;
  }
  let score = 0;
  for (const [di, dj] of dirs) {
    const ni = i + di;
    const nj = j + dj;
    if (input[ni]?.[nj] === next) {
      score += getScore(ni, nj, visited, next + 1);
    }
  }
  return score;
};

console.log(
  input.reduce(
    (acc, l, i) =>
      acc +
      l.reduce((acc, c, j) => {
        if (c !== 0) return acc;
        return acc + getScore(i, j, new Set());
      }, 0),
    0,
  ),
);

const getRating = (i, j, next = 1) => {
  if (next === 10) {
    return 1;
  }
  let score = 0;
  for (const [di, dj] of dirs) {
    const ni = i + di;
    const nj = j + dj;
    if (input[ni]?.[nj] === next) {
      score += getRating(ni, nj, next + 1);
    }
  }
  return score;
};

console.log(
  input.reduce(
    (acc, l, i) =>
      acc +
      l.reduce((acc, c, j) => {
        if (c !== 0) return acc;
        return acc + getRating(i, j);
      }, 0),
    0,
  ),
);
