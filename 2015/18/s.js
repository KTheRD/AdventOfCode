const input = require("fs")
  .readFileSync("./input", "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const adj = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const step = (prev) => {
  const next = Array.from({ length: prev.length }, () => []);

  for (let i = 0; i < prev.length; i++) {
    for (let j = 0; j < prev[i].length; j++) {
      let neighbors = 0;
      for (const [dx, dy] of adj) {
        const x = i + dx;
        const y = j + dy;
        if (prev[x]?.[y] === "#") {
          neighbors++;
        }
      }
      if (neighbors > 3 || neighbors < 2) {
        next[i][j] = ".";
      } else if (neighbors === 3) {
        next[i][j] = "#";
      } else {
        next[i][j] = prev[i][j];
      }
    }
  }

  return next;
};

let prev = input;
for (let i = 0; i < 100; i++) {
  prev = step(prev);
}

console.log(prev.flat().filter((c) => c === "#").length);

const stepWithStuck = (prev) => {
  const next = Array.from({ length: prev.length }, () => []);

  for (let i = 0; i < prev.length; i++) {
    for (let j = 0; j < prev[i].length; j++) {
      let neighbors = 0;
      for (const [dx, dy] of adj) {
        const x = i + dx;
        const y = j + dy;
        if (prev[x]?.[y] === "#") {
          neighbors++;
        }
      }
      if (neighbors > 3 || neighbors < 2) {
        next[i][j] = ".";
      } else if (neighbors === 3) {
        next[i][j] = "#";
      } else {
        next[i][j] = prev[i][j];
      }
      if (
        (i === 0 && j === 0) ||
        (i === 0 && j === prev[i].length - 1) ||
        (i === prev.length - 1 && j === 0) ||
        (i === prev.length - 1 && j === prev[i].length - 1)
      ) {
        next[i][j] = "#";
      }
    }
  }

  return next;
};

let prev2 = input;
for (let i = 0; i < 100; i++) {
  prev2 = stepWithStuck(prev2);
}
console.log(prev2.flat().filter((c) => c === "#").length);
