import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  return input.split("\n").map(BigInt);
}

/** @param {bigint} a */
const nextSecret = (a) => {
  const bigA = a;
  const step1 = (bigA ^ (bigA * 64n)) % 16777216n;
  const step2 = (step1 ^ (step1 / 32n)) % 16777216n;
  const step3 = (step2 ^ (step2 * 2048n)) % 16777216n;
  return step3;
};

/** @param {ReturnType<typeof parseInput>} input */
function part1(input) {
  return input
    .map((secret) => {
      for (let i = 0; i < 2000; i++) {
        secret = nextSecret(secret);
      }
      return secret;
    })
    .reduce((a, b) => a + b, 0n);
}

/** @param {ReturnType<typeof parseInput>} input */
function part2(input) {
  const intervals = new Map();
  input.forEach((monkey) => {
    const window = [null];
    const seen = new Set();
    let bananas = Number(monkey) % 10;
    for (let i = 0; i < 3; i++) {
      monkey = nextSecret(monkey);
      const newBananas = Number(monkey) % 10;
      window.push(newBananas - bananas);
      bananas = newBananas;
    }
    for (let i = 3; i < 2000; i++) {
      monkey = nextSecret(monkey);
      const newBananas = Number(monkey) % 10;
      window.shift();
      window.push(newBananas - bananas);
      if (!seen.has(window.join())) {
        seen.add(window.join());
        intervals.set(
          window.join(),
          (intervals.get(window.join()) || 0) + newBananas,
        );
      }
      bananas = newBananas;
    }
  });
  return Math.max(...intervals.values());
}

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
