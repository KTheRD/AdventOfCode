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
const getLength = (input, n) =>
  n === 0
    ? input.length
    : input.reduce((acc, cur) => {
        if (dict.has(cur) && dict.get(cur).has(n)) {
          return acc + dict.get(cur).get(n);
        }
        const stepResult = step(cur);
        const length = getLength(stepResult, n - 1);
        if (dict.has(cur)) {
          dict.get(cur).set(n, length);
        } else {
          dict.set(cur, new Map([[n, length]]));
        }
        return acc + length;
      }, 0);

console.log(getLength(input, 25));
console.log(getLength(input, 75));
