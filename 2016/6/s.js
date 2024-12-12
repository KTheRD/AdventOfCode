const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");

console.log(
  input
    .reduce(
      (acc, line) => {
        line.split("").forEach((c, i) => acc[i].push(c));
        return acc;
      },
      Array.from({ length: input[0].length }, () => []),
    )
    .map(
      (column) =>
        Array.from(
          column
            .reduce((acc, c) => {
              if (acc.has(c)) {
                acc.set(c, acc.get(c) + 1);
              } else {
                acc.set(c, 1);
              }
              return acc;
            }, new Map())
            .entries(),
        ).sort((a, b) => b[1] - a[1])[0][0],
    )
    .join(""),
);
console.log(
  input
    .reduce(
      (acc, line) => {
        line.split("").forEach((c, i) => acc[i].push(c));
        return acc;
      },
      Array.from({ length: input[0].length }, () => []),
    )
    .map(
      (column) =>
        Array.from(
          column
            .reduce((acc, c) => {
              if (acc.has(c)) {
                acc.set(c, acc.get(c) + 1);
              } else {
                acc.set(c, 1);
              }
              return acc;
            }, new Map())
            .entries(),
        ).sort((a, b) => b[1] - a[1]).at(-1)[0],
    )
    .join(""),
);
