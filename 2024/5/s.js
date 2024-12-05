const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");

const rules = [];
let i;
for (i = 0; input[i] !== ""; i++) {
  const [a, b] = input[i].split("|").map(Number);
  rules.push([a, b]);
}
i++;
const updates = [];
for (; i < input.length; i++) {
  const update = input[i].split(",").map(Number);
  updates.push(update);
}

console.log(
  updates
    .filter(
      (update) =>
        update.filter((value, index) =>
          rules
            .filter((rule) => rule[1] === value)
            .map((rule) => rule[0])
            .reduce((acc, n) => {
              for (let i = index + 1; i < update.length; i++) {
                if (update[i] === n) {
                  return true;
                }
              }
              return acc;
            }, false),
        ).length === 0,
    )
    .map((update) => update[Math.round(update.length / 2) - 1])
    .reduce((acc, n) => acc + n, 0),
);

const corrected = [];
for (let i = 0; i < updates.length; i++) {
  let didCorrect = false;
  let didCorrectThisTime = false;
  do {
    didCorrectThisTime = false;
    for (let j = 0; j < updates[i].length; j++) {
      const applicableRules = rules
        .filter((rule) => rule[1] === updates[i][j])
        .map((rule) => rule[0]);
      for (let k = j + 1; k < updates[i].length; k++) {
        if (applicableRules.includes(updates[i][k])) {
          didCorrect = true;
          didCorrectThisTime = true;
          [updates[i][j], updates[i][k]] = [updates[i][k], updates[i][j]];
        }
      }
    }

    if (!didCorrect) {
      break;
    }
  } while (didCorrectThisTime);

  if (didCorrect) {
    corrected.push(updates[i]);
  }
}

console.log(
  corrected
    .map((update) => update[Math.round(update.length / 2) - 1])
    .reduce((acc, n) => acc + n, 0),
);
