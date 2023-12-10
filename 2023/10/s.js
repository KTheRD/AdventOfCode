const input = require("fs")
  .readFileSync("./2023/10/input", "utf-8")
  .split("\n")
  .map((r) => r.split(""));
input.pop();

const loop = [];

const S = {};
for (let i = 0; i < input.length; i++) {
  const j = input[i].indexOf("S");
  if (j !== -1) {
    S.x = i;
    S.y = j;
    break;
  }
}

//sides:
// 1
//0S2
// 3

loop.push({ p: S, side: 3 }); //side is assumed
loop.push({ p: { x: S.x - 1, y: S.y }, side: 2 }); //side checked manually, I am lazy

do {
  switch (input[loop.at(-1).p.x][loop.at(-1).p.y]) {
    case "|":
      if (loop.at(-2).p.x > loop.at(-1).p.x) {
        loop.push({
          p: { x: loop.at(-1).p.x - 1, y: loop.at(-1).p.y },
          side: loop.at(-1).side,
        });
      } else {
        loop.push({
          p: { x: loop.at(-1).p.x + 1, y: loop.at(-1).p.y },
          side: loop.at(-1).side,
        });
      }
      break;
    case "-":
      if (loop.at(-2).p.y > loop.at(-1).p.y) {
        loop.push({
          p: { x: loop.at(-1).p.x, y: loop.at(-1).p.y - 1 },
          side: loop.at(-1).side,
        });
      } else {
        loop.push({
          p: { x: loop.at(-1).p.x, y: loop.at(-1).p.y + 1 },
          side: loop.at(-1).side,
        });
      }
      break;
    //////////
    case "7":
      if (loop.at(-2).p.y < loop.at(-1).p.y) {
        loop.push({
          p: { x: loop.at(-1).p.x + 1, y: loop.at(-1).p.y },
          side: (loop.at(-1).side + 1) % 4,
        });
      } else {
        loop.push({
          p: { x: loop.at(-1).p.x, y: loop.at(-1).p.y - 1 },
          side: (loop.at(-1).side + 3) % 4,
        });
      }
      break;
    case "J":
      if (loop.at(-2).p.y < loop.at(-1).p.y) {
        loop.push({
          p: { x: loop.at(-1).p.x - 1, y: loop.at(-1).p.y },
          side: (loop.at(-1).side + 3) % 4,
        });
      } else {
        loop.push({
          p: { x: loop.at(-1).p.x, y: loop.at(-1).p.y - 1 },
          side: (loop.at(-1).side + 1) % 4,
        });
      }
      break;
    case "F":
      if (loop.at(-2).p.y > loop.at(-1).p.y) {
        loop.push({
          p: { x: loop.at(-1).p.x + 1, y: loop.at(-1).p.y },
          side: (loop.at(-1).side + 3) % 4,
        });
      } else {
        loop.push({
          p: { x: loop.at(-1).p.x, y: loop.at(-1).p.y + 1 },
          side: (loop.at(-1).side + 1) % 4,
        });
      }
      break;
    case "L":
      if (loop.at(-2).p.y > loop.at(-1).p.y) {
        loop.push({
          p: { x: loop.at(-1).p.x - 1, y: loop.at(-1).p.y },
          side: (loop.at(-1).side + 1) % 4,
        });
      } else {
        loop.push({
          p: { x: loop.at(-1).p.x, y: loop.at(-1).p.y + 1 },
          side: (loop.at(-1).side + 3) % 4,
        });
      }
      break;
    default:
      throw new Error("error");
  }
  input[loop.at(-2).p.x][loop.at(-2).p.y] += "W";
} while (input[loop.at(-1).p.x][loop.at(-1).p.y] !== "S");

console.log(Math.ceil((loop.length - 2) / 2));

require("fs").writeFileSync(
  "./2023/10/output",
  input.map((r) => r.map((c) => (c[1] ? c[1] : c[0])).join("")).join("\n"),
);

let inLoop = false;
let enteredBorder = null;
let enclosed = 0;
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j][1] === "W" || input[i][j] === "S") {
      if (input[i][j][0] === "-") continue;
      if (input[i][j][0] === "|") {
        inLoop = !inLoop;
        continue;
      }
      if (input[i][j][0] === "S") {
        input[i][j] = "JW";
      }
      if (!enteredBorder) {
        enteredBorder = input[i][j][0];
        continue;
      }
      if (enteredBorder === "F") {
        if (input[i][j][0] === "J") {
          inLoop = !inLoop;
        }
        enteredBorder = null;
        continue;
      }
      if (enteredBorder === "L") {
        if (input[i][j][0] === "7") {
          inLoop = !inLoop;
        }
        enteredBorder = null;
        continue;
      }
      console.log(enteredBorder, input[i][j], i, j);
      throw null;
    } else if (inLoop) {
      enclosed++;
    }
  }
  if (inLoop) {
    console.log(enteredBorder)
  }
}

console.log(enclosed);

// const colorSide = (x, y, side) => {
//   switch (side) {
//     case 0:
//       if (
//         input[x][y - 1] !== "I" &&
//         input[x][y - 1] !== "W" &&
//         input[x][y - 1] !== "S"
//       ) {
//         input[x][y - 1] = "I";
//         flood(x, y - 1);
//       }
//       return;
//     case 1:
//       if (
//         input[x - 1][y] !== "I" &&
//         input[x - 1][y] !== "W" &&
//         input[x - 1][y] !== "S"
//       ) {
//         input[x - 1][y] = "I";
//         flood(x - 1, y);
//       }
//       return;
//     case 2:
//       if (
//         input[x][y + 1] !== "I" &&
//         input[x][y + 1] !== "W" &&
//         input[x][y + 1] !== "S"
//       ) {
//         input[x][y + 1] = "I";
//         flood(x, y + 1);
//       }
//       return;
//     case 3:
//       if (
//         input[x + 1][y] !== "I" &&
//         input[x + 1][y] !== "W" &&
//         input[x + 1][y] !== "S"
//       ) {
//         input[x + 1][y] = "I";
//         flood(x + 1, y);
//       }
//       return;
//   }
// };
//
// const flood = (x, y) => {
//   if (
//     input[x + 1][y] !== "I" &&
//     input[x + 1][y] !== "W" &&
//     input[x + 1][y] !== "S"
//   ) {
//     input[x + 1][y] = "I";
//     flood(x + 1, y);
//   }
//   if (
//     input[x - 1][y] !== "I" &&
//     input[x - 1][y] !== "W" &&
//     input[x - 1][y] !== "S"
//   ) {
//     input[x - 1][y] = "I";
//     flood(x - 1, y);
//   }
//   if (
//     input[x][y + 1] !== "I" &&
//     input[x][y + 1] !== "W" &&
//     input[x][y + 1] !== "S"
//   ) {
//     input[x][y + 1] = "I";
//     flood(x, y + 1);
//   }
//   if (
//     input[x][y - 1] !== "I" &&
//     input[x][y - 1] !== "W" &&
//     input[x][y - 1] !== "S"
//   ) {
//     input[x][y - 1] = "I";
//     flood(x, y - 1);
//   }
// };
//
// for (let i = 0; i < loop.length - 1; i++) {
//   colorSide(loop[i].p.x, loop[i].p.y, loop[i].side);
//   colorSide(loop[i].p.x, loop[i].p.y, (loop[i].side + 1) % 4);
// }
//
// console.log(
//   input.reduce(
//     (acc, r) => acc + r.reduce((acc, c) => (c === "I" ? acc + 1 : acc), 0),
//     0,
//   ),
// );
//
// require("fs").writeFileSync(
//   "./2023/10/output",
//   input.map((r) => r.join("")).join("\n"),
// );
