const input = require("fs").readFileSync("./bigboy.txt", "utf-8").split("\n");
input.pop();

const {left, right} = input
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

const map = right.reduce((acc, r) => {
  if (acc.has(r)) {
    acc.set(r, acc.get(r) + 1);
  } else {
    acc.set(r, 1);
  }
  return acc;
}, new Map());
const answer2 = left.reduce((acc, l) => {
  if (map.has(l)) {
    acc += l * map.get(l);
  }
  return acc;
}, 0);
console.log(answer2);
