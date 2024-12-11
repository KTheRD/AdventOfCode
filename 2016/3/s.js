const input = require("fs").readFileSync("./input", "utf-8").trim();

console.log(
  input
    .split("\n")
    .map((l) => l.match(/\d+/g).map(Number))
    .reduce((acc, [a, b, c]) => acc + (a + b > c && a + c > b && b + c > a), 0),
);

console.log(
  input
    .split("\n")
    .reduce((acc, l, i) => {
      if (i % 3 === 0) {
        acc.push([l]);
      } else {
        acc.at(-1).push(l);
      }
      return acc;
    }, [])
    .flatMap(([aa, bb, cc]) => {
      const [a1, a2, a3] = aa.match(/\d+/g).map(Number);
      const [b1, b2, b3] = bb.match(/\d+/g).map(Number);
      const [c1, c2, c3] = cc.match(/\d+/g).map(Number);
      return [
        [a1, b1, c1],
        [a2, b2, c2],
        [a3, b3, c3],
      ];
    })
    .reduce((acc, [a, b, c]) => acc + (a + b > c && a + c > b && b + c > a), 0),
);
