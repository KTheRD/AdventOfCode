const input = require("fs")
  .readFileSync("./input", "utf-8")
  .trim()
  .split("\n")
  .map((l) => l.split(""));

const initialGuardPosition = [];

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (input[y][x] === "^") {
      initialGuardPosition.push(y, x);
    }
  }
}

let count = 0;
for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (input[y][x] === "#" || input[y][x] === "^") {
      continue;
    }

    const inputCopy = input.map((l) => l.slice());
    inputCopy[y][x] = "#";

    const guardPos = [...initialGuardPosition];
    let guardFace = "^";
    let loop = false;

    while (inputCopy[guardPos[0]]?.[guardPos[1]] !== undefined) {
      if (
        inputCopy[guardPos[0]]?.[guardPos[1]] === guardFace &&
        guardPos[0] !== initialGuardPosition[0] &&
        guardPos[1] !== initialGuardPosition[1]
      ) {
        loop = true;
        break;
      }

      switch (guardFace) {
        case "^":
          if (inputCopy[guardPos[0] - 1]?.[guardPos[1]] !== "#") {
            inputCopy[guardPos[0]][guardPos[1]] = "^";
            guardPos[0] -= 1;
          } else {
            guardFace = ">";
          }
          break;
        case ">":
          if (inputCopy[guardPos[0]]?.[guardPos[1] + 1] !== "#") {
            inputCopy[guardPos[0]][guardPos[1]] = ">";
            guardPos[1] += 1;
          } else {
            guardFace = "v";
          }
          break;
        case "v":
          if (inputCopy[guardPos[0] + 1]?.[guardPos[1]] !== "#") {
            inputCopy[guardPos[0]][guardPos[1]] = "v";
            guardPos[0] += 1;
          } else {
            guardFace = "<";
          }
          break;
        case "<":
          if (inputCopy[guardPos[0]]?.[guardPos[1] - 1] !== "#") {
            inputCopy[guardPos[0]][guardPos[1]] = "<";
            guardPos[1] -= 1;
          } else {
            guardFace = "^";
          }
          break;
      }
    }

    if (loop) {
      count++;
    }
  }
}

console.log(count);
