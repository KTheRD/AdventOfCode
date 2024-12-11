const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");

const registers = {
  a: 0,
  b: 0,
};
for (let i = 0; i < input.length; i++) {
  const [operator, first, second] = input[i].split(" ");
  switch (operator) {
    case "hlf":
      registers[first] = Math.floor(registers[first] / 2);
      break;
    case "tpl":
      registers[first] *= 3;
      break;
    case "inc":
      registers[first]++;
      break;
    case "jmp":
      i += parseInt(first) - 1;
      break;
    case "jie":
      if (registers[first[0]] % 2 === 0) {
        i += parseInt(second) - 1;
      }
      break;
    case "jio":
      if (registers[first[0]] === 1) {
        i += parseInt(second) - 1;
      }
      break;
  }
}
console.log(registers.b);

registers.a = 1;
registers.b = 0;
for (let i = 0; i < input.length; i++) {
  const [operator, first, second] = input[i].split(" ");
  switch (operator) {
    case "hlf":
      registers[first] = Math.floor(registers[first] / 2);
      break;
    case "tpl":
      registers[first] *= 3;
      break;
    case "inc":
      registers[first]++;
      break;
    case "jmp":
      i += parseInt(first) - 1;
      break;
    case "jie":
      if (registers[first[0]] % 2 === 0) {
        i += parseInt(second) - 1;
      }
      break;
    case "jio":
      if (registers[first[0]] === 1) {
        i += parseInt(second) - 1;
      }
      break;
  }
}
console.log(registers.b);
