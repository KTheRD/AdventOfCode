const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");

const lightField = Array.from({ length: 1000 }, () =>
  Array.from({ length: 1000 }, () => false),
);

input.forEach((instruction) => {
  const [_, command, startXstr, startYstr, endXstr, endYstr] =
    instruction.match(
      /(toggle|turn on|turn off) (\d*),(\d*) through (\d*),(\d*)/,
    );

  const startX = parseInt(startXstr);
  const startY = parseInt(startYstr);
  const endX = parseInt(endXstr);
  const endY = parseInt(endYstr);

  switch (command) {
    case "toggle":
      for (let i = startX; i <= endX; i++) {
        for (let j = startY; j <= endY; j++) {
          lightField[i][j] = !lightField[i][j];
        }
      }
      break;
    case "turn on":
      for (let i = startX; i <= endX; i++) {
        for (let j = startY; j <= endY; j++) {
          lightField[i][j] = true;
        }
      }
      break;
    case "turn off":
      for (let i = startX; i <= endX; i++) {
        for (let j = startY; j <= endY; j++) {
          lightField[i][j] = false;
        }
      }
      break;
  }
});

console.log(lightField.flat().filter((light) => light).length);

const lightField2 = Array.from({ length: 1000 }, () =>
  Array.from({ length: 1000 }, () => 0),
);

input.forEach((instruction) => {
  const [_, command, startXstr, startYstr, endXstr, endYstr] =
    instruction.match(
      /(toggle|turn on|turn off) (\d*),(\d*) through (\d*),(\d*)/,
    );

  const startX = parseInt(startXstr);
  const startY = parseInt(startYstr);
  const endX = parseInt(endXstr);
  const endY = parseInt(endYstr);

  switch (command) {
    case "toggle":
      for (let i = startX; i <= endX; i++) {
        for (let j = startY; j <= endY; j++) {
          lightField2[i][j] += 2;
        }
      }
      break;
    case "turn on":
      for (let i = startX; i <= endX; i++) {
        for (let j = startY; j <= endY; j++) {
          lightField2[i][j]++;
        }
      }
      break;
    case "turn off":
      for (let i = startX; i <= endX; i++) {
        for (let j = startY; j <= endY; j++) {
          lightField2[i][j] = Math.max(0, lightField2[i][j] - 1);
        }
      }
      break;
  }
});

console.log(lightField2.flat().reduce((acc, light) => acc + light, 0));
