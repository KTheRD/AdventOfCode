const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");

const target = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

const sues = input.map((line) =>
  Object.fromEntries(
    line
      .split(/\d: /)[1]
      .split(", ")
      .map((c) => {
        const [key, value] = c.split(": ");
        return [key, parseInt(value, 10)];
      }),
  ),
);

console.log(
  sues.findIndex((sue) => {
    for (const key in sue) {
      if (sue[key] !== target[key]) {
        return false;
      }
    }
    return true;
  }) + 1,
);

console.log(
  sues.findIndex((sue) => {
    for (const key in sue) {
      if (key === "cats" || key === "trees") {
        if (sue[key] <= target[key]) {
          return false;
        }
      } else if (key === "pomeranians" || key === "goldfish") {
        if (sue[key] >= target[key]) {
          return false;
        }
      } else if (sue[key] !== target[key]) {
        return false;
      }
    }
    return true;
  }) + 1,
);
