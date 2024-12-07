const input = require("fs")
  .readFileSync("./input", "utf-8")
  .trim()
  .split("\n")
  .map((l) => {
    const [testValue, equation] = l.split(": ");
    return [Number(testValue), equation.split(" ").map(Number)];
  });

const checkEquationPart1 = (equation, testValue, acc = equation[0], i = 1) => {
  if (i === equation.length) {
    return acc === testValue;
  }

  if (acc > testValue) {
    return false;
  }

  return (
    checkEquationPart1(equation, testValue, acc + equation[i], i + 1) ||
    checkEquationPart1(equation, testValue, acc * equation[i], i + 1)
  );
};

console.log(
  input
    .filter(([testValue, equation]) => checkEquationPart1(equation, testValue))
    .map(([testValue]) => testValue)
    .reduce((a, b) => a + b, 0),
);

const concat = (a, b) => Number(a.toString() + b.toString());

const checkEquationPart2 = (equation, testValue, acc = equation[0], i = 1) => {
  if (i === equation.length) {
    return acc === testValue;
  }

  if (acc > testValue) {
    return false;
  }

  return (
    checkEquationPart2(equation, testValue, acc + equation[i], i + 1) ||
    checkEquationPart2(equation, testValue, acc * equation[i], i + 1) ||
    checkEquationPart2(equation, testValue, concat(acc, equation[i]), i + 1)
  );
};

console.log(
  input
    .filter(([testValue, equation]) => checkEquationPart2(equation, testValue))
    .map(([testValue]) => testValue)
    .reduce((a, b) => a + b, 0),
);
