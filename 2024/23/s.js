import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  /** @type {Map<string, Set<string>>} */
  const connectionsMap = new Map();
  input
    .split("\n")
    .map((line) => /** @type {[string, string]} */ (line.split("-")))
    .forEach(([from, to]) => {
      if (!connectionsMap.has(from)) {
        connectionsMap.set(from, new Set());
      }
      connectionsMap.get(from).add(to);
      if (!connectionsMap.has(to)) {
        connectionsMap.set(to, new Set());
      }
      connectionsMap.get(to).add(from);
    });
  return connectionsMap;
}

/** @param {ReturnType<typeof parseInput>} input */
function part1(input) {
  /** @type {Set<string>} */
  const visited = new Set();
  input.forEach((tos, from) => {
    if (!from.startsWith("t")) return;
    tos.forEach((to1) =>
      tos.forEach((to2) => {
        if (to1 === to2) return;
        if (!input.get(to1).has(to2)) return;
        visited.add([from, to1, to2].sort().join("-"));
      }),
    );
  });
  return visited.size;
}

/** @param {ReturnType<typeof parseInput>} input */
function part2(input) {
  /** @type {Map<string, string[]>} */
  const memo = new Map();
  /**
   * @param {string[]} clique
   * @param {string[]} possible
   */
  const maxClique = (clique, possible) => {
    if (memo.has(clique.join(","))) return memo.get(clique.join(","));
    if (possible.length === 0) return clique;
    let max = clique;
    possible.forEach((computer) => {
      const newMax = maxClique(
        [...clique, computer].sort(),
        possible.filter((p) => input.get(computer).has(p)),
      );
      if (newMax.length > max.length) max = newMax;
    });
    memo.set(clique.join(","), max);
    return max;
  };

  /** @type {string[]} */
  let max = [];
  input.keys().forEach((computer) => {
    const clique = maxClique([computer], [...input.get(computer)].sort());
    if (clique.length > max.length) max = clique;
  });
  return max.join(",");
}

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
