const input = require("fs")
  .readFileSync("./input", "utf-8")
  .trim()
  .split(" ")
  .map(Number);

const step = (n) => {
  if (n === 0) return [1];
  const digitCount = Math.floor(Math.log10(n)) + 1;
  if (digitCount % 2 === 0) {
    const divisor = 10 ** (digitCount / 2);
    return [Math.floor(n / divisor), n % divisor];
  }
  return [n * 2024];
};

const dict = new Map();
const lengthAfterNSteps = (input, n) =>
  n === 0
    ? input.length
    : input.reduce((acc, curr) => {
      if (dict.has(curr) && dict.get(curr)[n]) {
        return acc + dict.get(curr)[n];
      }
      const stepResult = step(curr);
      const count = lengthAfterNSteps(stepResult, n - 1);
      if (dict.has(curr)) {
        dict.get(curr)[n] = count;
      } else {
        dict.set(curr, { [n]: count });
      }
      return acc + count;
    }, 0);

console.log(lengthAfterNSteps(input, 25));
console.log(lengthAfterNSteps(input, 75));
