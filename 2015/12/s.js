const input = require("fs").readFileSync("./input", "utf-8").trim();

console.log(input.match(/-?\d+/g).reduce((a, b) => a + +b, 0));

const inputObj = JSON.parse(input);

const sumWithoutRed = (obj) => {
  if (typeof obj === "number") return obj;
  if (typeof obj === "string") return 0;
  if (Array.isArray(obj)) return obj.reduce((a, b) => a + sumWithoutRed(b), 0);
  if (typeof obj === "object") {
    if (Object.values(obj).includes("red")) return 0;
    return Object.values(obj).reduce((a, b) => a + sumWithoutRed(b), 0);
  }
};

console.log(sumWithoutRed(inputObj));
