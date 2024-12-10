const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");
const containers = input.map(Number);

let solutions = 0;

const permutate = (i = 0, left = 150) => {
  if (i === containers.length) {
    if (left === 0) solutions++;
    return;
  }

  permutate(i + 1, left);
  permutate(i + 1, left - containers[i]);
};

permutate();
console.log(solutions);

let minContainers = Infinity;
let minSolutions = 0;

const permutate2 = (i = 0, left = 150, used = 0) => {
  if (i === containers.length) {
    if (left === 0) {
      if (used < minContainers) {
        minContainers = used;
        minSolutions = 1;
      } else if (used === minContainers) {
        minSolutions++;
      }
    }
    return;
  }

  permutate2(i + 1, left, used);
  permutate2(i + 1, left - containers[i], used + 1);
};

permutate2();
console.log(minSolutions);
