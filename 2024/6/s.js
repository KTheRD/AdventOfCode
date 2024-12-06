const input = require("fs")
  .readFileSync("./input", "utf-8")
  .trim()
  .split("\n")
  .map((l) => l.split(""));
// const input = `....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`
//   .split("\n")
//   .map((l) => l.split(""));

const guardPosOriginal = [];

console.log(input.length, input[0].length);

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (input[y][x] === "^") {
      guardPosOriginal.push(y, x);
    }
  }
}

let count = 0;
for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (input[y][x] === "#" || input[y][x] === "^") {
      continue;
    }

    const inputCopy = input.map((l) => l.map((c) => c));
    inputCopy[y][x] = "#";

    const guardPos = [...guardPosOriginal];
    let guardFace = "^";
    let loop = false;

    while (inputCopy[guardPos[0]]?.[guardPos[1]] !== undefined) {
      if (
        inputCopy[guardPos[0]]?.[guardPos[1]] === guardFace &&
        guardPos[0] !== guardPosOriginal[0] &&
        guardPos[1] !== guardPosOriginal[1] 
      ) {
        loop = true;
        break;
      }
      if (guardFace === "^") {
        if (inputCopy[guardPos[0] - 1]?.[guardPos[1]] !== "#") {
          inputCopy[guardPos[0]][guardPos[1]] = "^";
          guardPos[0] -= 1;
        } else {
          guardFace = ">";
        }
      } else if (guardFace === ">") {
        if (inputCopy[guardPos[0]]?.[guardPos[1] + 1] !== "#") {
          inputCopy[guardPos[0]][guardPos[1]] = ">";
          guardPos[1] += 1;
        } else {
          guardFace = "v";
        }
      } else if (guardFace === "v") {
        if (inputCopy[guardPos[0] + 1]?.[guardPos[1]] !== "#") {
          inputCopy[guardPos[0]][guardPos[1]] = "v";
          guardPos[0] += 1;
        } else {
          guardFace = "<";
        }
      } else if (guardFace === "<") {
        if (inputCopy[guardPos[0]]?.[guardPos[1] - 1] !== "#") {
          inputCopy[guardPos[0]][guardPos[1]] = "<";
          guardPos[1] -= 1;
        } else {
          guardFace = "^";
        }
      }
    }

    if (loop) {
      count++;
    }
  }
}

console.log(count);
