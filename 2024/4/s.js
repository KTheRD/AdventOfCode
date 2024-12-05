const input = require("fs")
  .readFileSync("./bigboy.txt", "utf-8")
  .trim()
  .split("\n")
  .map((l) => l.split(""));

function searchXmas(i, j) {
  let count = 0;
  if (
    input[i]?.[j + 1] === "M" &&
    input[i]?.[j + 2] === "A" &&
    input[i]?.[j + 3] === "S"
  ) {
    count++;
  }
  if (
    input[i]?.[j - 1] === "M" &&
    input[i]?.[j - 2] === "A" &&
    input[i]?.[j - 3] === "S"
  ) {
    count++;
  }
  if (
    input[i + 1]?.[j] === "M" &&
    input[i + 2]?.[j] === "A" &&
    input[i + 3]?.[j] === "S"
  ) {
    count++;
  }
  if (
    input[i - 1]?.[j] === "M" &&
    input[i - 2]?.[j] === "A" &&
    input[i - 3]?.[j] === "S"
  ) {
    count++;
  }
  if (
    input[i + 1]?.[j + 1] === "M" &&
    input[i + 2]?.[j + 2] === "A" &&
    input[i + 3]?.[j + 3] === "S"
  ) {
    count++;
  }
  if (
    input[i - 1]?.[j + 1] === "M" &&
    input[i - 2]?.[j + 2] === "A" &&
    input[i - 3]?.[j + 3] === "S"
  ) {
    count++;
  }
  if (
    input[i + 1]?.[j - 1] === "M" &&
    input[i + 2]?.[j - 2] === "A" &&
    input[i + 3]?.[j - 3] === "S"
  ) {
    count++;
  }
  if (
    input[i - 1]?.[j - 1] === "M" &&
    input[i - 2]?.[j - 2] === "A" &&
    input[i - 3]?.[j - 3] === "S"
  ) {
    count++;
  }
  return count;
}

console.log(
  input.reduce(
    (acc, line, i) =>
      line.reduce(
        (acc, c, j) => (c === "X" ? acc + searchXmas(i, j) : acc),
        0,
      ) + acc,
    0,
  ),
);

function searchCrossMas(i, j) {
  if (
    input[i - 1]?.[j - 1] === "M" &&
    input[i + 1]?.[j - 1] === "M" &&
    input[i - 1]?.[j + 1] === "S" &&
    input[i + 1]?.[j + 1] === "S"
  ) {
    return 1;
  }
  if (
    input[i - 1]?.[j - 1] === "M" &&
    input[i - 1]?.[j + 1] === "M" &&
    input[i + 1]?.[j - 1] === "S" &&
    input[i + 1]?.[j + 1] === "S"
  ) {
    return 1;
  }
  if (
    input[i - 1]?.[j - 1] === "S" &&
    input[i + 1]?.[j - 1] === "S" &&
    input[i - 1]?.[j + 1] === "M" &&
    input[i + 1]?.[j + 1] === "M"
  ) {
    return 1;
  }
  if (
    input[i - 1]?.[j - 1] === "S" &&
    input[i - 1]?.[j + 1] === "S" &&
    input[i + 1]?.[j - 1] === "M" &&
    input[i + 1]?.[j + 1] === "M"
  ) {
    return 1;
  }
  return 0;
}

console.log(
  input.reduce(
    (acc, line, i) =>
      line.reduce(
        (acc, c, j) => (c === "A" ? acc + searchCrossMas(i, j) : acc),
        0,
      ) + acc,
    0,
  ),
);
