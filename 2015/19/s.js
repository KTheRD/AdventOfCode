const input = require("fs").readFileSync("./input", "utf-8").trim();

const [rulesTxt, molecule] = input.split("\n\n");
const rules = rulesTxt.split("\n").map((rule) => rule.split(" => "));

const molecules = new Set();

for (const [from, to] of rules) {
  let i = -1;
  while ((i = molecule.indexOf(from, i + 1)) !== -1) {
    molecules.add(molecule.slice(0, i) + to + molecule.slice(i + from.length));
  }
}

console.log(molecules.size);

let steps = 0;
let moleculeCopy = molecule;
while (moleculeCopy !== "e") {
  const randomRule = rules[Math.floor(Math.random() * rules.length)];
  if (moleculeCopy.includes(randomRule[1])) {
    moleculeCopy = moleculeCopy.replace(randomRule[1], randomRule[0]);
    steps++;
    console.log(moleculeCopy);
  }
}
console.log(steps);
