import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

function parseInput(input) {
  return input.split("\n").map((line) => line.split(""));
}

const directions = [
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
];

const search = (map, x, y) => {
  const history = new Map();
  let minScore = Infinity;
  let searchList = [{ x, y, score: 0, direction: 0 }];
  while (searchList.length) {
    const newSearchList = [];
    for (const { x, y, score, direction } of searchList) {
      if (score >= minScore) {
        continue;
      }
      if (map[y][x] === "#") {
        continue;
      }
      if (map[y][x] === "E") {
        minScore = Math.min(minScore, score);
        continue;
      }
      if (
        history.has(`${x},${y},${direction}`) &&
        history.get(`${x},${y},${direction}`) <= score
      ) {
        continue;
      } else {
        history.set(`${x},${y},${direction}`, score);
      }
      newSearchList.push({
        x: x + directions[direction].x,
        y: y + directions[direction].y,
        score: score + 1,
        direction,
      });
      newSearchList.push({
        x,
        y,
        score: score + 1000,
        direction: (direction + 1) % 4,
      });
      newSearchList.push({
        x,
        y,
        score: score + 1000,
        direction: (direction + 3) % 4,
      });
    }
    searchList = newSearchList;
  }
  return minScore;
};

const searchAllPaths = (map, x, y) => {
  const minPathCells = new Set();
  const minScore = search(map, x, y);
  const minScoreTo = Array.from({ length: map.length }, () =>
    Array.from({ length: map[0].length }, () =>
      Array.from({ length: 4 }, () => Infinity),
    ),
  );
  let searchList = [{ x, y, score: 0, direction: 0, visited: [] }];
  while (searchList.length) {
    const newSearchList = [];
    for (const { x, y, score, direction, visited } of searchList) {
      if (minScore < score) {
        continue;
      }
      if (minScoreTo[y][x][direction] < score) {
        continue;
      }
      if (map[y][x] === "#") {
        continue;
      }
      minScoreTo[y][x][direction] = score;
      if (map[y][x] === "E") {
        if (score === minScore) {
          for (const cell of visited) {
            minPathCells.add(cell);
          }
        }
        minPathCells.add(`${x},${y}`);
        continue;
      }
      newSearchList.push({
        x: x + directions[direction].x,
        y: y + directions[direction].y,
        score: score + 1,
        direction,
        visited: visited.concat([`${x},${y}`]),
      });
      newSearchList.push({
        x,
        y,
        score: score + 1000,
        direction: (direction + 1) % 4,
        visited,
      });
      newSearchList.push({
        x,
        y,
        score: score + 1000,
        direction: (direction + 3) % 4,
        visited,
      });
    }
    searchList = newSearchList;
  }
  return minPathCells.size;
};

function part1(map) {
  let reindeerX = 0;
  let reindeerY = 0;
  outer: for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "S") {
        reindeerX = j;
        reindeerY = i;
        break outer;
      }
    }
  }
  return search(map, reindeerX, reindeerY);
}

function part2(map) {
  let reindeerX = 0;
  let reindeerY = 0;
  outer: for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "S") {
        reindeerX = j;
        reindeerY = i;
        break outer;
      }
    }
  }
  return searchAllPaths(map, reindeerX, reindeerY);
}

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
