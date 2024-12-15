import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim().split("\n\n");
const [mapStr, movesStr] = input;
const map = mapStr.split("\n").map((row) => row.split(""));
const widerMap = map.map((row) =>
  row
    .reduce(
      (acc, cell) =>
        cell === "#"
          ? acc + "##"
          : cell === "O"
            ? acc + "[]"
            : cell === "."
              ? acc + ".."
              : cell === "@"
                ? acc + "@."
                : acc,
      "",
    )
    .split(""),
);
const moves = movesStr.split("");

const move = (posX, posY, dir) => {
  switch (dir) {
    case "^":
      for (let i = posY - 1; i >= 0; i--) {
        if (map[i][posX] === ".") {
          map[posY][posX] = ".";
          for (let j = posY - 2; j >= i; j--) {
            map[j][posX] = "O";
          }
          map[posY - 1][posX] = "@";
          return [posX, posY - 1];
        }
        if (map[i][posX] === "#") {
          return [posX, posY];
        }
      }
    case ">":
      for (let i = posX + 1; i < map[0].length; i++) {
        if (map[posY][i] === ".") {
          map[posY][posX] = ".";
          for (let j = posX + 2; j <= i; j++) {
            map[posY][j] = "O";
          }
          map[posY][posX + 1] = "@";
          return [posX + 1, posY];
        }
        if (map[posY][i] === "#") {
          return [posX, posY];
        }
      }
    case "v":
      for (let i = posY + 1; i < map.length; i++) {
        if (map[i][posX] === ".") {
          map[posY][posX] = ".";
          for (let j = posY + 2; j <= i; j++) {
            map[j][posX] = "O";
          }
          map[posY + 1][posX] = "@";
          return [posX, posY + 1];
        }
        if (map[i][posX] === "#") {
          return [posX, posY];
        }
      }
    case "<":
      for (let i = posX - 1; i >= 0; i--) {
        if (map[posY][i] === ".") {
          map[posY][posX] = ".";
          for (let j = posX - 2; j >= i; j--) {
            map[posY][j] = "O";
          }
          map[posY][posX - 1] = "@";
          return [posX - 1, posY];
        }
        if (map[posY][i] === "#") {
          return [posX, posY];
        }
      }
    default:
      return [posX, posY];
  }
};

let posX, posY;
outer: for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[0].length; j++) {
    if (map[i][j] === "@") {
      posX = j;
      posY = i;
      break outer;
    }
  }
}

for (let i = 0; i < moves.length; i++) {
  [posX, posY] = move(posX, posY, moves[i]);
}

const gpsCoordinates = (x, y) => x + y * 100;

let sum = map.reduce((acc, row, y) => {
  return (
    acc +
    row.reduce(
      (acc, cell, x) => (cell === "O" ? acc + gpsCoordinates(x, y) : acc),
      0,
    )
  );
}, 0);
console.log(sum);

{
  const findBoxes = (listToMove, posX, posY, dir) => {
    switch (dir) {
      case "^":
        if (widerMap[posY - 1][posX] === "#") {
          return false;
        }
        if (widerMap[posY - 1][posX] === ".") {
          return true;
        }
        if (widerMap[posY - 1][posX] === "[") {
          if (listToMove.has(`${posX},${posY - 1}`)) {
            return true;
          }
          listToMove.add(`${posX},${posY - 1}`);
          return (
            findBoxes(listToMove, posX, posY - 1, dir) &&
            findBoxes(listToMove, posX + 1, posY - 1, dir)
          );
        }
        if (widerMap[posY - 1][posX] === "]") {
          if (listToMove.has(`${posX - 1},${posY - 1}`)) {
            return true;
          }
          listToMove.add(`${posX - 1},${posY - 1}`);
          return (
            findBoxes(listToMove, posX, posY - 1, dir) &&
            findBoxes(listToMove, posX - 1, posY - 1, dir)
          );
        }
      case ">":
        if (widerMap[posY][posX + 1] === "#") {
          return false;
        }
        if (widerMap[posY][posX + 1] === ".") {
          return true;
        }
        if (widerMap[posY][posX + 1] === "[") {
          listToMove.add(`${posX + 1},${posY}`);
          return findBoxes(listToMove, posX + 2, posY, dir);
        }
      case "v":
        if (widerMap[posY + 1][posX] === "#") {
          return false;
        }
        if (widerMap[posY + 1][posX] === ".") {
          return true;
        }
        if (widerMap[posY + 1][posX] === "[") {
          if (listToMove.has(`${posX},${posY + 1}`)) {
            return true;
          }
          listToMove.add(`${posX},${posY + 1}`);
          return (
            findBoxes(listToMove, posX, posY + 1, dir) &&
            findBoxes(listToMove, posX + 1, posY + 1, dir)
          );
        }
        if (widerMap[posY + 1][posX] === "]") {
          if (listToMove.has(`${posX - 1},${posY + 1}`)) {
            return true;
          }
          listToMove.add(`${posX - 1},${posY + 1}`);
          return (
            findBoxes(listToMove, posX, posY + 1, dir) &&
            findBoxes(listToMove, posX - 1, posY + 1, dir)
          );
        }
      case "<":
        if (widerMap[posY][posX - 1] === "#") {
          return false;
        }
        if (widerMap[posY][posX - 1] === ".") {
          return true;
        }
        if (widerMap[posY][posX - 1] === "]") {
          if (listToMove.has(`${posX - 2},${posY}`)) {
            return true;
          }
          listToMove.add(`${posX - 2},${posY}`);
          return findBoxes(listToMove, posX - 2, posY, dir);
        }
    }
  };

  const moveBoxes = (listToMove, dir) => {
    for (let str of listToMove) {
      const [x, y] = str.split(",").map(Number);
      widerMap[y][x] = ".";
      widerMap[y][x + 1] = ".";
    }
    switch (dir) {
      case "^":
        for (let str of listToMove) {
          const [x, y] = str.split(",").map(Number);
          widerMap[y - 1][x] = "[";
          widerMap[y - 1][x + 1] = "]";
        }
        return;
      case ">":
        for (let str of listToMove) {
          const [x, y] = str.split(",").map(Number);
          widerMap[y][x + 1] = "[";
          widerMap[y][x + 2] = "]";
        }
        return;
      case "v":
        for (let str of listToMove) {
          const [x, y] = str.split(",").map(Number);
          widerMap[y + 1][x] = "[";
          widerMap[y + 1][x + 1] = "]";
        }
        return;
      case "<":
        for (let str of listToMove) {
          const [x, y] = str.split(",").map(Number);
          widerMap[y][x - 1] = "[";
          widerMap[y][x] = "]";
        }
        return;
    }
  };

  const moveWider = (posX, posY, dir) => {
    switch (dir) {
      case "^": {
        if (widerMap[posY - 1][posX] === ".") {
          widerMap[posY][posX] = ".";
          widerMap[posY - 1][posX] = "@";
          return [posX, posY - 1];
        }
        if (widerMap[posY - 1][posX] === "#") {
          return [posX, posY];
        }
        const listToMove = new Set();
        if (findBoxes(listToMove, posX, posY, dir)) {
          moveBoxes(listToMove, dir);
          widerMap[posY][posX] = ".";
          widerMap[posY - 1][posX] = "@";
          return [posX, posY - 1];
        }
        return [posX, posY];
      }
      case ">": {
        if (widerMap[posY][posX + 1] === ".") {
          widerMap[posY][posX] = ".";
          widerMap[posY][posX + 1] = "@";
          return [posX + 1, posY];
        }
        if (widerMap[posY][posX + 1] === "#") {
          return [posX, posY];
        }
        const listToMove = new Set();
        if (findBoxes(listToMove, posX, posY, dir)) {
          moveBoxes(listToMove, dir);
          widerMap[posY][posX] = ".";
          widerMap[posY][posX + 1] = "@";
          return [posX + 1, posY];
        }
        return [posX, posY];
      }
      case "v": {
        if (widerMap[posY + 1][posX] === ".") {
          widerMap[posY][posX] = ".";
          widerMap[posY + 1][posX] = "@";
          return [posX, posY + 1];
        }
        if (widerMap[posY + 1][posX] === "#") {
          return [posX, posY];
        }
        const listToMove = new Set();
        if (findBoxes(listToMove, posX, posY, dir)) {
          moveBoxes(listToMove, dir);
          widerMap[posY][posX] = ".";
          widerMap[posY + 1][posX] = "@";
          return [posX, posY + 1];
        }
        return [posX, posY];
      }
      case "<": {
        if (widerMap[posY][posX - 1] === ".") {
          widerMap[posY][posX] = ".";
          widerMap[posY][posX - 1] = "@";
          return [posX - 1, posY];
        }
        if (widerMap[posY][posX - 1] === "#") {
          return [posX, posY];
        }
        const listToMove = new Set();
        if (findBoxes(listToMove, posX, posY, dir)) {
          moveBoxes(listToMove, dir);
          widerMap[posY][posX] = ".";
          widerMap[posY][posX - 1] = "@";
          return [posX - 1, posY];
        }
        return [posX, posY];
      }
      default:
        return [posX, posY];
    }
  };

  let posX, posY;
  outer: for (let i = 0; i < widerMap.length; i++) {
    for (let j = 0; j < widerMap[0].length; j++) {
      if (widerMap[i][j] === "@") {
        posX = j;
        posY = i;
        break outer;
      }
    }
  }

  for (let i = 0; i < moves.length; i++) {
    [posX, posY] = moveWider(posX, posY, moves[i]);
  }

  const sum = widerMap.reduce((acc, row, y) => {
    return (
      acc +
      row.reduce(
        (acc, cell, x) => (cell === "[" ? acc + gpsCoordinates(x, y) : acc),
        0,
      )
    );
  }, 0);
  console.log(sum);
}
