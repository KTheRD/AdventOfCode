const input = require("fs").readFileSync("./input", "utf-8").trim();

{
  let length = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] !== "(") {
      length++;
      continue;
    }
    const beginCommand = i;
    for (; input[i] !== ")"; i++);
    const command = input.slice(beginCommand, i + 1);
    const [a, b] = command.slice(1, -1).split("x").map(Number);
    length += a * b;
    i += a;
  }

  console.log(length);
}

{
  const decompressLength = (str) => {
    let length = 0;

    for (let i = 0; i < str.length; i++) {
      if (str[i] !== "(") {
        length++;
        continue;
      }
      const beginCommand = i;
      for (; str[i] !== ")"; i++);
      const command = str.slice(beginCommand, i + 1);
      const [a, b] = command.slice(1, -1).split("x").map(Number);
      length += b * decompressLength(str.slice(i + 1, i + 1 + a));
      i += a;
    }

    return length;
  };

  console.log(decompressLength(input));
}
