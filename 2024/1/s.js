const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");

const { left, right } = input
  .map((l) => l.split("   ").map((n) => parseInt(n)))
  .reduce(
    (acc, [left, right]) => {
      acc.left.push(left);
      acc.right.push(right);
      return acc;
    },
    { left: [], right: [] },
  );

left.sort((a, b) => a - b);
right.sort((a, b) => a - b);
const answer1 = left.reduce((acc, a, i) => (acc += Math.abs(a - right[i])), 0);
console.log(answer1);

const map = right.reduce(
  (acc, r) => acc.set(r, (acc.get(r) || 0) + 1),
  new Map(),
);
const answer2 = left.reduce((acc, l) => (acc += l * (map.get(l) || 0)), 0);
console.log(answer2);
