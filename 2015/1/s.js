const input = require("fs").readFileSync("./input", "utf-8").trim();
let wasInBasement = false;
console.log(
  input.split("").reduce((a, c, i) => {
    if (a === -1 && !wasInBasement) {
      console.log(i);
      wasInBasement = true;
    }
    return a + (c === "(" ? 1 : -1);
  }, 0),
);
