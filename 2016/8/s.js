const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");

const screen = Array(6)
  .fill()
  .map(() => Array(50).fill(false));
input.forEach((line) => {
  const splitted = line.split(" ");
  const cmd = splitted[0];
  switch (cmd) {
    case "rect":
      const [width, height] = splitted[1].split("x").map(Number);
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          screen[i][j] = true;
        }
      }
      break;
    case "rotate":
      const type = splitted[1];
      switch (type) {
        case "row":
          {
            const row = Number(splitted[2].split("=")[1]);
            const by = Number(splitted[4]);
            const rowCopy = [];
            screen[row].forEach((pixel, i) => {
              rowCopy[(i + by) % 50] = pixel;
            });
            screen[row] = rowCopy;
          }
          break;
        case "column":
          {
            const column = Number(splitted[2].split("=")[1]);
            const by = Number(splitted[4]);
            const columnCopy = [];
            screen.forEach((row, i) => {
              columnCopy[(i + by) % 6] = row[column];
            });
            screen.forEach((row, i) => {
              row[column] = columnCopy[i];
            });
          }
          break;
      }
      break;
  }
});

console.log(screen.reduce((acc, row) => acc + row.filter(Boolean).length, 0));
console.log(
  screen
    .map((row) => row.map((pixel) => (pixel ? "#" : ".")).join(""))
    .join("\n"),
);
