const input = require("fs")
  .readFileSync("./input", "utf-8")
  .trim()
  .split("\n")
  .map((l) => l.split(""));

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

const verfifyCoords = (x, y) =>
  x >= 0 && x < input.length && y >= 0 && y < input[0].length;

const frequencies = new Map();
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    if (input[i][j].match(/[A-Za-z\d]/)) {
      if (!frequencies.has(input[i][j])) {
        frequencies.set(input[i][j], [[i, j]]);
      } else {
        frequencies.get(input[i][j]).push([i, j]);
      }
    }
  }
}

const antinodes = Array.from({ length: input.length }, () =>
  Array.from({ length: input[0].length }, () => 0),
);
const getAntinodes = (x1, y1, x2, y2) => {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);

  let antiX1, antiY1, antiX2, antiY2;

  if (x1 > x2) {
    antiX1 = x1 + dx;
    antiX2 = x2 - dx;
  } else {
    antiX1 = x1 - dx;
    antiX2 = x2 + dx;
  }
  if (y1 > y2) {
    antiY1 = y1 + dy;
    antiY2 = y2 - dy;
  } else {
    antiY1 = y1 - dy;
    antiY2 = y2 + dy;
  }

  return [antiX1, antiY1, antiX2, antiY2];
};

for (const [_, coords] of frequencies) {
  for (let i = 0; i < coords.length - 1; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const [x1, y1] = coords[i];
      const [x2, y2] = coords[j];

      const [antix1, antiy1, antix2, antiy2] = getAntinodes(x1, y1, x2, y2);

      if (verfifyCoords(antix1, antiy1)) {
        antinodes[antix1][antiy1] = 1;
      }
      if (verfifyCoords(antix2, antiy2)) {
        antinodes[antix2][antiy2] = 1;
      }
    }
  }
}

console.log(
  antinodes.reduce(
    (acc, row) => acc + row.reduce((acc, cell) => acc + cell, 0),
    0,
  ),
);

const allAntinodes = Array.from({ length: input.length }, () =>
  Array.from({ length: input[0].length }, () => 0),
);

const getAllAntinodes = (x1, y1, x2, y2) => {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const dxSign = Math.sign(x2 - x1);
  const dySign = Math.sign(y2 - y1);

  const xstep = (dx / gcd(dx, dy)) * dxSign;
  const ystep = (dy / gcd(dx, dy)) * dySign;

  let antiX = x1,
    antiY = y1;

  while (verfifyCoords(antiX, antiY)) {
    allAntinodes[antiX][antiY] = 1;
    antiX += xstep;
    antiY += ystep;
  }

  antiX = x1 - xstep;
  antiY = y1 - ystep;

  while (verfifyCoords(antiX, antiY)) {
    allAntinodes[antiX][antiY] = 1;
    antiX -= xstep;
    antiY -= ystep;
  }
};

for (const [_, coords] of frequencies) {
  for (let i = 0; i < coords.length - 1; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const [x1, y1] = coords[i];
      const [x2, y2] = coords[j];

      getAllAntinodes(x1, y1, x2, y2);
    }
  }
}

console.log(
  allAntinodes.reduce(
    (acc, row) => acc + row.reduce((acc, cell) => acc + cell, 0),
    0,
  ),
);
