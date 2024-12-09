const input = require("fs").readFileSync("./input", "utf-8").trim().split("");
// const input = "2333133121414131402".split("");

const disk = [];
let id = 0;
let file = true;
for (const c of input) {
  if (file) {
    disk.push(...Array.from({ length: Number(c) }, () => id));
    id++;
  } else {
    disk.push(...Array.from({ length: Number(c) }, () => "."));
  }
  file = !file;
}

const disk2 = disk.slice();

{
  let i = 0;
  let j = disk.length - 1;

  while (i < j) {
    if (disk[i] !== ".") {
      i++;
      continue;
    }
    if (disk[j] === ".") {
      j--;
      continue;
    }
    [disk[i], disk[j]] = [disk[j], disk[i]];
  }
}

console.log(
  disk.filter((c) => c !== ".").reduce((acc, c, i) => acc + c * i, 0),
);

const getFirstEmpty = (disk, size, limit) => {
  let empty = 0;
  for (let i = 0; i < limit; i++) {
    if (disk[i] === ".") {
      empty++;
      if (empty === size) {
        return i - size + 1;
      }
    } else {
      empty = 0;
    }
  }
  return -1;
};

{
  let id = ".";
  let fileSize = 0;
  for (let i = disk2.length - 1; i >= 0; i--) {
    if (disk2[i] !== id) {
      if (id === ".") {
        id = disk2[i];
        fileSize = 1;
      } else {
        const firstEmpty = getFirstEmpty(disk2, fileSize, i + fileSize);
        if (firstEmpty !== -1) {
          for (let j = firstEmpty; j < firstEmpty + fileSize; j++) {
            disk2[j] = id;
          }
          for (let j = i + 1; j <= i + fileSize; j++) {
            disk2[j] = ".";
          }
        }
        id = disk2[i];
        fileSize = 1;
      }
    } else {
      fileSize++;
    }
  }
}

console.log(disk2.reduce((acc, c, i) => (c === "." ? acc : acc + c * i), 0));
