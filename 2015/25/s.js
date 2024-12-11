const input = require("fs").readFileSync("./input", "utf-8").trim();
const [x, y] = input.match(/\d+/g).map(Number);

const nextCode = (n) => (n * 252533) % 33554393;
const firstCode = 20151125;

const getN = (x, y) => {
  const diagonalStartX = x + y - 1;
  const diagonalStartN = (diagonalStartX * (diagonalStartX - 1)) / 2 + 1;
  const diagonalLength = y - 1;
  return diagonalStartN + diagonalLength;
};

const getNthCode = (n) => {
  let code = firstCode;
  for (let i = 2; i <= n; i++) {
    code = nextCode(code);
  }
  return code;
}

console.log(getNthCode(getN(x, y))); 
