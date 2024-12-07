const input = require("fs")
  .readFileSync("./input", "utf-8")
  .trim()
  .split("\n")
  .map((l) => {
    const [testValue, equation] = l.split(": ");
    return [Number(testValue), equation.split(" ").map(Number)];
  });

const checkPart1 = (equation, testValue, acc = equation[0], i = 1) => {
  if (i === equation.length) {
    return acc === testValue;
  }

  if (acc > testValue) {
    return false;
  }

  return (
    checkPart1(equation, testValue, acc + equation[i], i + 1) ||
    checkPart1(equation, testValue, acc * equation[i], i + 1)
  );
};

console.log(
  input
    .filter(([testValue, equation]) => checkPart1(equation, testValue))
    .map(([testValue]) => testValue)
    .reduce((a, b) => a + b, 0),
);

const concat = (a, b) => a * 10 ** Math.floor(Math.log10(b) + 1) + b;

const checkPart2 = (equation, testValue, acc = equation[0], i = 1) => {
  if (i === equation.length) {
    return acc === testValue;
  }

  if (acc > testValue) {
    return false;
  }

  return (
    checkPart2(equation, testValue, acc + equation[i], i + 1) ||
    checkPart2(equation, testValue, acc * equation[i], i + 1) ||
    checkPart2(equation, testValue, concat(acc, equation[i]), i + 1)
  );
};

console.log(
  input
    .filter(([testValue, equation]) => checkPart2(equation, testValue))
    .map(([testValue]) => testValue)
    .reduce((a, b) => a + b, 0),
);
