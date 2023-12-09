const input = require("fs").readFileSync("input", "utf-8").split("\n");
input.pop();

const getDifferences = (a) => {
  const result = [];
  for (let i = 1; i < a.length; i++) {
    result.push(a[i] - a[i - 1]);
  }
  return result;
};

const extrapolate = (a) => {
  let differences = [];
  do {
    differences.push(getDifferences(differences.at(-1) || a));
  } while (!differences.at(-1).every((n) => n === 0));

  differences.at(-1).unshift(0);

  for (let i = differences.length - 2; i >= 0; i--) {
    differences[i].unshift(differences[i][0] - differences[i + 1][0]);
  }

  return a[0] - differences[0][0];
};

const answer = input
  .map((s) => s.split(" ").map(Number))
  .map((h) => extrapolate(h))
  .reduce((a, b) => a + b);

console.log(answer);
