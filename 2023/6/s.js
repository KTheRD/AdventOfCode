const input = require("fs").readFileSync("input", "utf-8").split("\n");
input.pop();

//(t-x)*x > d
//x^2 - tx + d < 0
//D = b^2 - 4ac
//t^2 - 4d

const countPossibilities = (t, d) => {
  const sqrtD = Math.sqrt(t ** 2 - 4 * d);
  let x1 = (t - sqrtD) / 2;
  let x2 = (t + sqrtD) / 2;
  if (Number.isInteger(x1)) {
    x1 = x1 + 1;
  } else {
    x1 = Math.ceil(x1);
  }

  if (Number.isInteger(x2)) {
    x2 = x2 - 1;
  } else {
    x2 = Math.floor(x2);
  }

  return x2 - x1 + 1;
};

const time = input[0].match(/\d+/g).join('');
const distance = input[1].match(/\d+/g).join('');

console.log(+time, +distance)

const answer = countPossibilities(+time, +distance)

console.log(answer)
