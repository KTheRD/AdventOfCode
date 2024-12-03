const input = require("fs").readFileSync("./input", "utf-8").trim();

console.log(
  Array.from(input.matchAll(/mul\(\d+,\d+\)/g)).reduce(
    (acc, match) =>
      acc +
      match[0]
        .slice(4, -1)
        .split(",")
        .reduce((acc, n) => acc * Number(n), 1),
    0,
  ),
);

let doMul = true;
console.log(
  Array.from(input.matchAll(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g)).reduce(
    (acc, match) => {
      if (match[0] === "do()") {
        doMul = true;
      } else if (match[0] === "don't()") {
        doMul = false;
      } else if (doMul) {
        const [a, b] = match[0].slice(4, -1).split(",").map(Number);
        acc += a * b;
      }
      return acc;
    },
    0,
  ),
);
