const input = require("fs").readFileSync("./input", "utf-8").trim().split("");

let x = 0,
  y = 0;
const visited = new Set();
visited.add(`${x},${y}`);

input.forEach((c) => {
  if (c === "^") y++;
  if (c === "v") y--;
  if (c === ">") x++;
  if (c === "<") x--;

  visited.add(`${x},${y}`);
});

console.log(visited.size);

let xReal = 0,
  xRobo = 0,
  yReal = 0,
  yRobo = 0;
const visitedWithRobo = new Set();
visitedWithRobo.add(`${xReal},${yReal}`);

input.forEach((c, i) => {
  if (i % 2 === 0) {
    if (c === "^") yReal++;
    if (c === "v") yReal--;
    if (c === ">") xReal++;
    if (c === "<") xReal--;
    visitedWithRobo.add(`${xReal},${yReal}`);
  } else {
    if (c === "^") yRobo++;
    if (c === "v") yRobo--;
    if (c === ">") xRobo++;
    if (c === "<") xRobo--;
    visitedWithRobo.add(`${xRobo},${yRobo}`);
  }
});

console.log(visitedWithRobo.size);
