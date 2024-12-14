import { createCanvas } from "canvas";
import { readFileSync, writeFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim().split("\n");
const HEIGHT = 103;
const WIDTH = 101;

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
    x: (((x + time * vx) % WIDTH) + WIDTH) % WIDTH,
    y: (((y + time * vy) % HEIGHT) + HEIGHT) % HEIGHT,
  }));

const robotsGrid = (robotsAt) => {
  const grid = Array.from({ length: WIDTH }, () =>
    Array.from({ length: HEIGHT }, () => false),
  );
  robotsAt.forEach(({ x, y }) => {
    grid[x][y] = true;
  });
  return grid;
};

const IMAGE_WIDTH = 100;
const IMAGE_HEIGHT = 100;
const image = createCanvas(IMAGE_WIDTH * WIDTH, IMAGE_HEIGHT * HEIGHT);
const ctx = image.getContext("2d");
for (let time = 0; time < IMAGE_WIDTH * IMAGE_HEIGHT; time++) {
  const robotsAtTime = robotsAt(time);
  const grid = robotsGrid(robotsAtTime);
  const originX = (time % IMAGE_WIDTH) * WIDTH;
  const originY = Math.floor(time / IMAGE_WIDTH) * HEIGHT;
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      ctx.fillStyle = grid[x][y] ? "#FFFFFF" : "#000000";
      ctx.fillRect(originX + x, originY + y, 1, 1);
    }
  }
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "30px Arial";
  ctx.fillText(time.toString(), originX, originY + 30);
}
writeFileSync("output.png", image.toBuffer());
