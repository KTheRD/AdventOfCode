const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");
console.log(
  input
    .map((line) => line.length - eval(line).length)
    .reduce((a, b) => a + b, 0),
);

console.log(
  input
    .map((line) => JSON.stringify(line).length - line.length)
    .reduce((a, b) => a + b, 0),
);
