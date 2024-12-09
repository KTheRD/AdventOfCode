const input = require('fs').readFileSync('./input', 'utf-8').trim();

const lookAndSay = (input) => {
  let count = 1;
  let current = input[0];
  let result = '';

  for (let i = 1; i < input.length; i++) {
    if (input[i] === current) {
      count++;
    } else {
      result += count + current;
      current = input[i];
      count = 1;
    }
  }

  return result + count + current;
}

let result = input

for (let i = 0; i < 40; i++) {
  result = lookAndSay(result);
}

console.log(result.length);

for (let i = 0; i < 10; i++) {
  result = lookAndSay(result);
}

console.log(result.length);
