const input = require("fs")
  .readFileSync("./input", "utf-8")
  .trim()
  .split("\n")
  .map(Number);

const oneThird = input.reduce((acc, curr) => acc + curr, 0) / 3;
let minimalGroupLength = Infinity;
let minimalGroups = [];
const iterate = (arr = input, i = 0, target = oneThird, used = []) => {
  if (target === 0) {
    if (used.length < minimalGroupLength) {
      minimalGroupLength = used.length;
      minimalGroups = [used];
    } else if (used.length === minimalGroupLength) {
      minimalGroups.push(used);
    }
    return;
  }
  if (target < 0) return;
  for (; i < arr.length; i++) {
    iterate(arr, i + 1, target - arr[i], [...used, arr[i]]);
  }
};
iterate();
console.log(
  Math.min(
    ...minimalGroups.map((group) => group.reduce((acc, curr) => acc * curr, 1)),
  ),
);

const oneFourth = input.reduce((acc, curr) => acc + curr, 0) / 4;
let minimalGroupLength2 = Infinity;
let minimalGroups2 = [];
const iterate2 = (arr = input, i = 0, target = oneFourth, used = []) => {
  if (target === 0) {
    if (used.length < minimalGroupLength2) {
      minimalGroupLength2 = used.length;
      minimalGroups2 = [used];
    } else if (used.length === minimalGroupLength2) {
      minimalGroups2.push(used);
    }
    return;
  }
  if (target < 0) return;
  for (; i < arr.length; i++) {
    iterate2(arr, i + 1, target - arr[i], [...used, arr[i]]);
  }
};
iterate2();
console.log(
  Math.min(
    ...minimalGroups2.map((group) =>
      group.reduce((acc, curr) => acc * curr, 1),
    ),
  ),
);
