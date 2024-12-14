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
const IMAGE_WIDTH = 100;
const IMAGE_HEIGHT = 100;
const image = createCanvas(IMAGE_WIDTH * WIDTH, IMAGE_HEIGHT * HEIGHT);
const ctx = image.getContext("2d");
for (let time = 0; time < IMAGE_WIDTH * IMAGE_HEIGHT; time++) {
  const robotsAtTime = robots.map(({ x, y, vx, vy }) => ({
    x: (((x + time * vx) % WIDTH) + WIDTH) % WIDTH,
    y: (((y + time * vy) % HEIGHT) + HEIGHT) % HEIGHT,
  }));
  const originX = (time % IMAGE_WIDTH) * WIDTH;
  const originY = Math.floor(time / IMAGE_WIDTH) * HEIGHT;
  ctx.fillStyle = "#000000";
  ctx.fillRect(originX, originY, WIDTH, HEIGHT);
  ctx.fillStyle = "#FFFFFF";
  robotsAtTime.forEach(({ x, y }) => {
    ctx.fillRect(originX + x, originY + y, 1, 1);
  });
  ctx.font = "30px Arial";
  ctx.fillText(time.toString(), originX, originY + 30);
}
writeFileSync("output.png", image.toBuffer());
