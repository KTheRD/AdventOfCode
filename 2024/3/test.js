const input = require("fs").readFileSync("./input", "utf-8").trim();

console.log(
  ("do()" + input).split("don't()").reduce((acc, line) => {
    const [_, ...mulStrings] = line.split("do()");
    return (
      acc +
      mulStrings.reduce((acc, str) => {
        const [_, ...muls] = str.split("mul(");
        return (
          acc +
          muls.reduce((acc, mul) => {
            const [a, ...rest] = mul.split(",");
            const [b] = rest.join("").split(")");
            if (
              a.split("").every((c) => "0123456789".includes(c)) &&
              b.split("").every((c) => "0123456789".includes(c))
            ) {
              return acc + a * b;
            }
            return acc;
          }, 0)
        );
      }, 0)
    );
  }, 0),
);
