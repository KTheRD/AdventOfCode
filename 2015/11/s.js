const input = require("fs").readFileSync("./input", "utf-8").trim();

const incrementString = (str) => {
  let result = "";
  let carry = 1;
  for (let i = str.length - 1; i >= 0 && carry; i--) {
    const char = str[i];
    if (char === "z") {
      result = "a" + result;
    } else {
      result = String.fromCharCode(char.charCodeAt(0) + 1) + result;
      carry = 0;
      result = str.slice(0, i) + result;
    }
  }
  if (carry) {
    result = "b" + result;
  }
  return result;
};

const hasiol = (s) => /[iol]/.test(s);
const hasIncreasingStraight = (s) => {
  for (let i = 0; i < s.length - 2; i++) {
    if (
      s.charCodeAt(i) + 1 === s.charCodeAt(i + 1) &&
      s.charCodeAt(i) + 2 === s.charCodeAt(i + 2)
    ) {
      return true;
    }
  }
  return false;
};
const hasTwoPairs = (s) => {
  const pairs = s.match(/(.)\1/g);
  return pairs && pairs.length >= 2;
};
const isValid = (s) => !hasiol(s) && hasIncreasingStraight(s) && hasTwoPairs(s);

let result = input;
while (!isValid(result)) {
  result = incrementString(result);
}

console.log(result);

result = incrementString(result);
while (!isValid(result)) {
  result = incrementString(result);
}

console.log(result);
