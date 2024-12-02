const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");

const safeCount = input.reduce((acc, report) => {
  const levels = report.split(" ").map(Number);

  let isSafe = true;

  const increasing = levels[1] > levels[0];
  for (let i = 1; i < levels.length; i++) {
    if (
      increasing !== levels[i] > levels[i - 1] ||
      levels[i] === levels[i - 1] ||
      Math.abs(levels[i] - levels[i - 1]) > 3
    ) {
      isSafe = false;
    }
  }

  if (isSafe) {
    return acc + 1;
  }

  for (let i = 0; i < levels.length; i++) {
    const dampened = levels.toSpliced(i, 1);
    let isSafeDampened = true;

    const increasing = dampened[1] > dampened[0];
    for (let j = 1; j < dampened.length; j++) {
      if (
        increasing !== dampened[j] > dampened[j - 1] ||
        dampened[j] === dampened[j - 1] ||
        Math.abs(dampened[j] - dampened[j - 1]) > 3
      ) {
        isSafeDampened = false;
      }
    }

    if (isSafeDampened) {
      return acc + 1;
    }
  }

  return acc;
}, 0);
console.log(safeCount);
