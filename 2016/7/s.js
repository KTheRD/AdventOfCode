const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");

console.log(
  input.filter((line) => {
    const hypernet = (
      line
        .match(/\[.*?\]/g)
        .map((line) => line.substring(1, line.length - 1)) || []
    ).join("|");
    const rest = line.replace(/\[.*?\]/g, "|");
    return (
      /(?!(\w)\1)(\w)(\w)\3\2/.test(rest) &&
      !/(?!(\w)\1)(\w)(\w)\3\2/.test(hypernet)
    );
  }).length,
);

console.log(
  input.filter((line) => {
    const hypernet = (
      line
        .match(/\[.*?\]/g)
        .map((line) => line.substring(1, line.length - 1)) || []
    ).join("|");
    const rest = line.replace(/\[.*?\]/g, "|");
    const ABA = []
    for (let i = 0; i < rest.length - 2; i++) {
      if (rest[i] === rest[i + 2] && rest[i] !== rest[i + 1]) {
        ABA.push(rest.substring(i, i + 3));
      }
    }
    if (!ABA.length) return false;
    return ABA.some((aba) => hypernet.includes(aba[1] + aba[2] + aba[1]));
  }).length
);
