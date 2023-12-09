const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

const lcm = (a, b) => (a * b) / gcd(a, b);

const input = require("fs").readFileSync("input", "utf-8").split("\n");
input.pop();

const instructions = input[0];

const nodes = {};
const startNodes = [];

for (let i = 2; i < input.length; i++) {
  const name = input[i].slice(0, 3);
  if (name[2] === "A") startNodes.push(name);
  const L = input[i].slice(7, 10);
  const R = input[i].slice(12, 15);
  nodes[name] = { L, R };
}

let currentNodes = [...startNodes].map((n) => ({
  name: n,
  period: 0,
  finished: false,
}));

let step = 0;
while (!currentNodes.every((n) => n.finished)) {
  currentNodes = currentNodes.map((n) => {
    if (n.finished) return n;
    n.period++;
    n.name = nodes[n.name][instructions[step % instructions.length]];
    if (n.name[2] === "Z") n.finished = true;
    return n;
  });
  step++;
}

const answer = currentNodes.map((n) => n.period).reduce(lcm);

console.log(answer);
