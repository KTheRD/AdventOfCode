const input = require("fs").readFileSync("./input", "utf-8").trim().split(", ");

{
  let x = 0;
  let y = 0;
  let direction = 0;
  for (const instruction of input) {
    const turn = instruction[0];
    const distance = Number(instruction.slice(1));
    switch (turn) {
      case "R":
        direction = (direction + 1) % 4;
        break;
      case "L":
        direction = (direction + 3) % 4;
        break;
    }
    switch (direction) {
      case 0:
        y += distance;
        break;
      case 1:
        x += distance;
        break;
      case 2:
        y -= distance;
        break;
      case 3:
        x -= distance;
        break;
    }
  }
  console.log(Math.abs(x) + Math.abs(y));
}

{
  let x = 0;
  let y = 0;
  let direction = 0;
  const visited = new Set(["0,0"]);
  for (const instruction of input) {
    const turn = instruction[0];
    const distance = Number(instruction.slice(1));
    switch (turn) {
      case "R":
        direction = (direction + 1) % 4;
        break;
      case "L":
        direction = (direction + 3) % 4;
        break;
    }
    switch (direction) {
      case 0:
        for (let i = 1; i <= distance; i++) {
          y++;
          if (visited.has(`${x},${y}`)) {
            console.log(Math.abs(x) + Math.abs(y));
            return;
          }
          visited.add(`${x},${y}`);
        }
        break;
      case 1:
        for (let i = 1; i <= distance; i++) {
          x++;
          if (visited.has(`${x},${y}`)) {
            console.log(Math.abs(x) + Math.abs(y));
            return;
          }
          visited.add(`${x},${y}`);
        }
        break;
      case 2:
        for (let i = 1; i <= distance; i++) {
          y--;
          if (visited.has(`${x},${y}`)) {
            console.log(Math.abs(x) + Math.abs(y));
            return;
          }
          visited.add(`${x},${y}`);
        }
        break;
      case 3:
        for (let i = 1; i <= distance; i++) {
          x--;
          if (visited.has(`${x},${y}`)) {
            console.log(Math.abs(x) + Math.abs(y));
            return;
          }
          visited.add(`${x},${y}`);
        }
        break;
    }
  }
  console.log(Math.abs(x) + Math.abs(y));
}
