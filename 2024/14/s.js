const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");

const TALL = 103;
const WIDE = 101;

const robots = input.map((line) => {
  const [_, x, y, vx, vy] = line.match(/p=(.*),(.*) v=(.*),(.*)/).map(Number);
  return {
    x,
    y,
    vx,
    vy,
  };
});

const robotsAt = (time) =>
  robots.map(({ x, y, vx, vy }) => ({
    x: (x + time * vx + WIDE * 100000) % WIDE,
    y: (y + time * vy + TALL * 100000) % TALL,
  }));

const robotsGrid = (robotsAt) => {
  const grid = Array.from({ length: WIDE }, () =>
    Array.from({ length: TALL }, () => 0),
  );
  robotsAt.forEach(({ x, y }) => {
    grid[x][y]++;
  });
  return grid;
};

const robotsAt100 = robotsAt(100);

let topLeft = 0;
let topRight = 0;
let bottomLeft = 0;
let bottomRight = 0;
const centerx = Math.floor(WIDE / 2),
  centery = Math.floor(TALL / 2);
robotsAt100.forEach(({ x, y }) => {
  if (x < centerx && y < centery) {
    topLeft++;
  } else if (x > centerx && y < centery) {
    topRight++;
  } else if (x < centerx && y > centery) {
    bottomLeft++;
  } else if (x > centerx && y > centery) {
    bottomRight++;
  }
});
console.log(topLeft * topRight * bottomLeft * bottomRight);

const print = (robotsAt) => {
  const grid = Array.from({ length: TALL }, () =>
    Array.from({ length: WIDE }, () => "."),
  );
  robotsAt.forEach(({ x, y }) => {
    if (grid[y][x] === ".") {
      grid[y][x] = 1;
    } else {
      grid[y][x]++;
    }
  });
  console.log(grid.map((line) => line.join("")).join("\n"));
};

for (let i = 0; ; i++) {
  const robotsAti = robotsAt(i);
  const grid = robotsGrid(robotsAti);
  let biggestStraightLine = 0;
  for (let x = 0; x < WIDE; x++) {
    let line = false;
    let lineLength = 0;
    for (let y = 0; y < TALL; y++) {
      if (grid[x][y] > 0) {
        line = true;
        lineLength++;
      } else {
        if (line) {
          biggestStraightLine = Math.max(biggestStraightLine, lineLength);
          line = false;
          lineLength = 0;
        }
      }
    }
  }
  for (let y = 0; y < TALL; y++) {
    let line = false;
    let lineLength = 0;
    for (let x = 0; x < WIDE; x++) {
      if (grid[x][y] > 0) {
        line = true;
        lineLength++;
      } else {
        if (line) {
          biggestStraightLine = Math.max(biggestStraightLine, lineLength);
          line = false;
          lineLength = 0;
        }
      }
    }
  }
  if (biggestStraightLine > 10) {
    print(robotsAti);
    console.log(i);
  }
}
