const sorting = (a, b) => (a < b ? 1 : a > b ? -1 : 0);

const intersectRanges = (range1, range2) => {
  console.log(range1, range2);
  const intersectionStart =
    range1.start > range2.start ? range1.start : range2.start;
  const intersectionEnd =
    range1.start + range1.range - 1n > range2.start + range2.range - 1n
      ? range2.start + range2.range - 1n
      : range1.start + range1.range - 1n;

  const intersection =
    intersectionStart <= intersectionEnd
      ? {
          start: intersectionStart,
          range: intersectionEnd - intersectionStart + 1n,
        }
      : null;

  const rightStart = intersectionEnd + 1n;
  const right =
    rightStart <= range1.start + range1.range - 1n
      ? { start: rightStart, range: range1.start + range1.range - rightStart }
      : null;

  const leftEnd = intersectionStart - 1n;
  const left =
    leftEnd >= range1.start
      ? { start: range1.start, range: leftEnd - range1.start + 1n }
      : null;

  return { intersection, right, left };
};

// const input = require("fs").readFileSync("input", "utf-8").split("\n");
// input.pop();

const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`.split("\n");

const seedsPart1 = input[0].split(": ")[1].split(" ");
const seeds = [];
for (let i = 1; i < seedsPart1.length; i += 2) {
  seeds.push({
    start: BigInt(seedsPart1[i - 1]),
    range: BigInt(seedsPart1[i]),
  });
}

seeds.sort((a, b) => sorting(a.start, b.start));

const mappingsNotFull = [[]];
let i = 0;
for (let j = 3; j < input.length; j++) {
  if (input[j] === "") {
    j++;
    i++;
    mappingsNotFull.push([]);
    continue;
  }

  const [destination, source, range] = input[j]
    .split(" ")
    .map((s) => BigInt(s));

  mappingsNotFull[i].push({ destination, source, range });
}

const mappings = [];

for (const i = 0; i < mappingsNotFull.length; i++) {
  if (mappingsNotFull[i][0].destination > 0)
    mappings.push({
      source: 0,
      destination: 0,
      range: mappingsNotFull[0][0].destination,
    });
  mappings.push(mappingsNotFull[i][0]);
  for (const j = 1; j < mappingsNotFull[i].length; j++) {
    if (
      mappings.at(-1).destination + mappings.at(-1).range !==
      mappingsNotFull[i][j].destination
    ) {
      mappings.push({
        source: mappings.at(-1).destination + mappings.at(-1).range,
        destination: mappingsNotFull[i][j].destination,
        range:
          mappingsNotFull[i][j].destination -
          mappings.at(-1).destination -
          mappings.at(-1).range,
      });
    }
    mappings.push(mappingsNotFull[i][j]);
  }
}

mappings.map((m) => m.sort((a, b) => sorting(a.destination, b.destination)));

const stack = [];

while (true) {
  if (!stack.length) {
    stack.push({
      data: {
        start: mappings.at(-1).at(-1).source,
        range: mappings.at(-1).at(-1).range,
      },
      level: 2,
      destination: mappings[6].at(-1).destination,
    });
  }
  const currentRange = stack.pop();
  if (currentRange.level === 8) {
    //find seeds
    console.log(currentRange);
    break;
  }

  const {
    right,
    left: _,
    intersection,
  } = intersectRanges(currentRange.data, {
    start: mappings.at(-currentRange.level).at(-1).destination,
    range: mappings.at(-currentRange.level).at(-1).range,
  });
  if (intersection) {
    if (right) {
      stack.push({
        data: {
          start: currentRange.data.start + intersection.range - 1n,
          range: currentRange.data.range - intersection.range,
        },
        level: currentRange.level,
        destination: currentRange.destination + intersection.range - 1n,
      });
    }

    stack.push({
      data: {
        start: intersection.start,
        range: intersection.range,
      },
      level: currentRange.level + 1,
      destination:
        currentRange.destination +
        (intersection.start - currentRange.data.start),
    });
  }
  if (right) {
    mappings.at(-currentRange.level).pop();
  }
}
