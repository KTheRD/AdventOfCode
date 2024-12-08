const input = require("fs")
  .readFileSync("./input", "utf-8")
  .trim()
  .split("\n")
  .map((l) => l.split("x").map(Number));

const area = (l, w, h) => 2 * l * w + 2 * w * h + 2 * h * l;
const slack = (l, w, h) => Math.min(l * w, w * h, h * l);
const ribbon = (l, w, h) => 2 * Math.min(l + w, w + h, h + l);
const bow = (l, w, h) => l * w * h;

console.log(
  input
    .map(([l, w, h]) => area(l, w, h) + slack(l, w, h))
    .reduce((a, b) => a + b, 0),
);
console.log(
  input
    .map(([l, w, h]) => ribbon(l, w, h) + bow(l, w, h))
    .reduce((a, b) => a + b, 0),
);
