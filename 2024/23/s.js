import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  /** @type {Map<string, string[]>} */
  const connectionsMap = new Map();
  input
    .split("\n")
    .map((line) => /** @type {[string, string]} */(line.split("-")))
    .forEach(([from, to]) => {
      if (!connectionsMap.has(from)) {
        connectionsMap.set(from, []);
      }
      connectionsMap.get(from).push(to);
      if (!connectionsMap.has(to)) {
        connectionsMap.set(to, []);
      }
      connectionsMap.get(to).push(from);
    });
  return connectionsMap;
}

/** @param {ReturnType<typeof parseInput>} input */
function part1(input) {
  const visited = new Set();
  input.forEach((tos, from) => {
    if (!from.startsWith("t")) return;
    tos.forEach((to1) =>
      tos.forEach((to2) => {
        if (to1 === to2) return;
        if (!input.get(to1).includes(to2)) return;
        visited.add([from, to1, to2].sort().join("-"));
      }),
    );
  });
  return visited.size;
}

/** @param {ReturnType<typeof parseInput>} input */
function part2(input) {
  let biggestSet = [];
  input.forEach((tos, from) => {
    const set = [from];
    tos.forEach((to) => {
      if (set.every((from) => input.get(from).includes(to))) {
        set.push(to);
      }
    });
    if (set.length > biggestSet.length) {
      biggestSet = set;
    }
  });
  return biggestSet.sort().join(",");
}

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
