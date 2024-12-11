const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");

const letters = "abcdefghijklmnopqrstuvwxyz";
console.log(
  input.reduce((acc, line) => {
    const data = line.split("-");
    const name = data.slice(0, -1).join(" ");
    const [_, id, checksum] = data.at(-1).match(/(\d+)\[(\w+)\]/);
    const calculatedChecksum = [
      ...name.split("").reduce((acc, char) => {
        if (char === " ") {
          return acc;
        }
        if (acc.has(char)) {
          acc.set(char, acc.get(char) + 1);
        } else {
          acc.set(char, 1);
        }
        return acc;
      }, new Map()),
    ]
      .sort((a, b) => {
        if (a[1] === b[1]) {
          return a[0].localeCompare(b[0]);
        }
        return b[1] - a[1];
      })
      .slice(0, 5)
      .map((x) => x[0])
      .join("");
    if (calculatedChecksum === checksum) {
      console.log(
        name
          .split("")
          .map((char) => {
            if (char === " ") {
              return " ";
            }
            return letters[
              (letters.indexOf(char) + parseInt(id)) % letters.length
            ];
          })
          .join(""),
        id,
      );

      return acc + parseInt(id);
    }
    return acc;
  }, 0),
);
