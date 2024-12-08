const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");
console.log(
  input.filter(
    (line) =>
      /(.*[aeiou].*){3}/.test(line) &&
      /(.)\1/.test(line) &&
      !/ab|cd|pq|xy/.test(line),
  ).length,
);

console.log(
  input.filter((line) => /(..).*\1/.test(line) && /(.).\1/.test(line)).length,
);
