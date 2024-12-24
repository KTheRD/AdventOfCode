import { readFileSync } from "fs";

const input = readFileSync("./bigboy", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  /** @type {Map<string, Set<string>>} */
  const connectionsMap = new Map();
  input
    .split("\n")
    .map((line) => /** @type {[string, string]} */(line.split("-")))
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
    tos.forEach((to1) => {
      tos.forEach((to2) => {
        if (to1 === to2) return;
        if (!input.get(to1).has(to2)) return;
        visited.add([from, to1, to2].sort().join("-"));
      });
      input.get(from).delete(to1);
    });
  });
  return visited.size;
}

/** @param {ReturnType<typeof parseInput>} input */
function part2(input) {
  /**
   * @param {Set<string>} clique
   * @param {Set<string>} possible
   */
  const maxClique = (clique, possible) => {
    if (possible.size === 0) return clique;
    let max = clique;
    for (const computer of possible) {
      const newClique = new Set(clique);
      newClique.add(computer);
      const newMax = maxClique(
        newClique,
        possible.intersection(input.get(computer)),
      );
      possible.delete(computer);
      input.set(computer, input.get(computer).difference(newClique));
      for (const c of newClique) {
        input.get(c).delete(computer);
      }
      if (newMax.size > max.size) max = newMax;
    }
    return max;
  };

  /** @type {Set<string>} */
  let max = new Set();
  input.keys().forEach((computer) => {
    const clique = maxClique(new Set([computer]), new Set(input.get(computer)));
    if (clique.size > max.size) max = clique;
  });
  return max.size;
}

console.time();
console.log(part1(parseInput(input)));
console.timeEnd();
console.time();
console.log(part2(parseInput(input)));
console.timeEnd();
