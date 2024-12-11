const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");
{
  const keyPad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  let x = 1;
  let y = 1;
  let code = "";
  input.forEach((line) => {
    line.split("").forEach((direction) => {
      switch (direction) {
        case "U":
          y = Math.max(0, y - 1);
          break;
        case "D":
          y = Math.min(2, y + 1);
          break;
        case "L":
          x = Math.max(0, x - 1);
          break;
        case "R":
          x = Math.min(2, x + 1);
          break;
      }
    });
    code += keyPad[y][x];
  });
  console.log(code);
}
{
  const keyPad = [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 2, 3, 4, 0, 0],
    [0, 5, 6, 7, 8, 9, 0],
    [0, 0, "A", "B", "C", 0, 0],
    [0, 0, 0, "D", 0, 0, 0],
  ];
  let x = 0;
  let y = 2;
  let code = "";
  input.forEach((line) => {
    line.split("").forEach((direction) => {
      let newX = x;
      let newY = y;
      switch (direction) {
        case "U":
          newY = Math.max(0, y - 1);
          break;
        case "D":
          newY = Math.min(4, y + 1);
          break;
        case "L":
          newX = Math.max(0, x - 1);
          break;
        case "R":
          newX = Math.min(6, x + 1);
          break;
      }
      if (keyPad[newY][newX] !== 0) {
        x = newX;
        y = newY;
      }
    });
    code += keyPad[y][x];
  });
  console.log(code);
}
