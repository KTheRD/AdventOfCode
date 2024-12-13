const input = require("fs")
  .readFileSync("./input", "utf-8")
  .trim()
  .split("\n\n");

const games = input.map((gameStr) => {
  const [Ax, Ay, Bx, By, Px, Py] = gameStr.match(/\d+/g).map(BigInt);
  return {
    Ax,
    Ay,
    Bx,
    By,
    Px,
    Py,
  };
});

const solveGame = ({ Ax, Ay, Bx, By, Px, Py }) => {
  if ((Py * Ax - Px * Ay) % (By * Ax - Bx * Ay) !== 0n) return false;
  const b = (Py * Ax - Px * Ay) / (By * Ax - Bx * Ay);
  if ((Px - b * Bx) % Ax !== 0n) return false;
  const a = (Px - b * Bx) / Ax;
  return a * 3n + b;
};

console.log(
  games
    .map(solveGame)
    .filter((s) => s)
    .reduce((acc, game) => acc + game, 0n),
);

const games2 = games.map((game) => ({
  ...game,
  Px: game.Px + 10000000000000n,
  Py: game.Py + 10000000000000n,
}));

console.log(
  games2
    .map(solveGame)
    .filter((s) => s)
    .reduce((acc, game) => acc + game, 0n),
);
