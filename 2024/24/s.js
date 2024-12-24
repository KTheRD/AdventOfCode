import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  const [wireValuesStr, gateConnectionsStr] = input.split("\n\n");
  const wireValues = new Map(
    wireValuesStr.split("\n").map((line) => {
      const [wire, value] = line.split(": ");
      return [wire, !!Number(value)];
    }),
  );
  const gateConnections = gateConnectionsStr.split("\n").map((line) => {
    const [input1, gate, input2, , outputWire] = line.split(" ");
    return {
      input1,
      gate,
      input2,
      outputWire,
    };
  });
  return {
    wireValues,
    gateConnections,
  };
}

/** @param {ReturnType<typeof parseInput>} input */
function part1({ wireValues, gateConnections }) {
  let didChange = false;
  do {
    didChange = false;
    for (const { input1, gate, input2, outputWire } of gateConnections) {
      if (wireValues.has(outputWire)) {
        continue;
      }
      if (!wireValues.has(input1) || !wireValues.has(input2)) {
        continue;
      }
      switch (gate) {
        case "AND":
          wireValues.set(
            outputWire,
            wireValues.get(input1) && wireValues.get(input2),
          );
          break;
        case "OR":
          wireValues.set(
            outputWire,
            wireValues.get(input1) || wireValues.get(input2),
          );
          break;
        case "XOR":
          wireValues.set(
            outputWire,
            wireValues.get(input1) !== wireValues.get(input2),
          );
          break;
      }
      didChange = true;
    }
  } while (didChange);

  const zValue = Array.from(wireValues)
    .filter(([key]) => key.startsWith("z"))
    .map(([key, value]) => [Number(key.slice(1)), Number(value)])
    .sort(([a], [b]) => b - a)
    .reduce((acc, [, value]) => acc * 2 + value, 0);
  return zValue;
}

/** @param {Map<string, boolean>} map */
const copyMap = (map) => new Map(map);
/**
 * @param {{
 *   input1: string;
 *   gate: string;
 *   input2: string;
 *   outputWire: string;
 * }[]} array
 */
const copyArray = (array) => array.map((item) => ({ ...item }));
/**
 * @param {Map<string, boolean>} wireValues
 * @param {{
 *   input1: string;
 *   gate: string;
 *   input2: string;
 *   outputWire: string;
 * }[]} gateConnections
 */
const runMachine = (wireValues, gateConnections) => {
  let didChange = false;
  do {
    didChange = false;
    for (const { input1, gate, input2, outputWire } of gateConnections) {
      if (wireValues.has(outputWire)) {
        continue;
      }
      if (!wireValues.has(input1) || !wireValues.has(input2)) {
        continue;
      }
      switch (gate) {
        case "AND":
          wireValues.set(
            outputWire,
            wireValues.get(input1) && wireValues.get(input2),
          );
          break;
        case "OR":
          wireValues.set(
            outputWire,
            wireValues.get(input1) || wireValues.get(input2),
          );
          break;
        case "XOR":
          wireValues.set(
            outputWire,
            wireValues.get(input1) !== wireValues.get(input2),
          );
          break;
      }
      didChange = true;
    }
  } while (didChange);
  const zValue = Array.from(wireValues)
    .filter(([key]) => key.startsWith("z"))
    .map(([key, value]) => [Number(key.slice(1)), Number(value)])
    .sort(([a], [b]) => a - b)
    .reduce((acc, [, value]) => acc + value, "");
  return zValue;
};
/** @param {ReturnType<typeof parseInput>} input */
function part2({ wireValues, gateConnections }) {
  const xValue = Array.from(wireValues)
    .filter(([key]) => key.startsWith("x"))
    .map(([key, value]) => [Number(key.slice(1)), Number(value)])
    .sort(([a], [b]) => b - a)
    .reduce((acc, [, value]) => acc * 2 + value, 0);

  const yValue = Array.from(wireValues)
    .filter(([key]) => key.startsWith("y"))
    .map(([key, value]) => [Number(key.slice(1)), Number(value)])
    .sort(([a], [b]) => b - a)
    .reduce((acc, [, value]) => acc * 2 + value, 0);

  const sumStr = (xValue + yValue).toString(2).split("").reverse().join("");

  let zValue = runMachine(copyMap(wireValues), copyArray(gateConnections));
  /**
   * @type {{
   *   sum?: string;
   *   carry?: string;
   *   result?: string;
   *   resultCarry?: string;
   *   intermediate?: string;
   * }[]}
   */
  const arr = [{ intermediate: null }];
  const x0 = "x00";
  const y0 = "y00";
  for (const { input1, input2, gate, outputWire } of gateConnections) {
    if (
      (input1 === x0 && input2 === y0) ||
      (input2 === x0 && input1 === y0 && gate === "XOR")
    ) {
      arr.at(-1).sum = outputWire;
      arr.at(-1).result = outputWire;
      break;
    }
  }
  for (const { input1, input2, gate, outputWire } of gateConnections) {
    if (
      (input1 === x0 && input2 === y0) ||
      (input2 === x0 && input1 === y0 && gate === "AND")
    ) {
      arr.at(-1).carry = outputWire;
      arr.at(-1).resultCarry = outputWire;
      break;
    }
  }

  for (let i = 1; i < sumStr.length - 1; i++) {
    const xWire = `x${i.toString().padStart(2, "0")}`;
    const yWire = `y${i.toString().padStart(2, "0")}`;
    const carryWire = arr.at(-1).resultCarry;
    arr.push({});
    for (const { input1, input2, gate, outputWire } of gateConnections) {
      if (
        ((input1 === xWire && input2 === yWire) ||
          (input2 === xWire && input1 === yWire)) &&
        gate === "XOR"
      ) {
        arr.at(-1).sum = outputWire;
        break;
      }
    }
    for (const { input1, input2, gate, outputWire } of gateConnections) {
      if (
        ((input1 === xWire && input2 === yWire) ||
          (input2 === xWire && input1 === yWire)) &&
        gate === "AND"
      ) {
        arr.at(-1).carry = outputWire;
        break;
      }
    }
    for (const { input1, input2, gate, outputWire } of gateConnections) {
      if (
        ((input1 === arr.at(-1).sum && input2 === carryWire) ||
          (input2 === arr.at(-1).sum && input1 === carryWire)) &&
        gate === "XOR"
      ) {
        arr.at(-1).result = outputWire;
        break;
      }
    }
    for (const { input1, input2, gate, outputWire } of gateConnections) {
      if (
        ((input1 === arr.at(-1).sum && input2 === carryWire) ||
          (input2 === arr.at(-1).sum && input1 === carryWire)) &&
        gate === "AND"
      ) {
        arr.at(-1).intermediate = outputWire;
        break;
      }
    }
    for (const { input1, input2, gate, outputWire } of gateConnections) {
      if (
        ((input1 === arr.at(-1).carry && input2 === arr.at(-1).intermediate) ||
          (input2 === arr.at(-1).carry &&
            input1 === arr.at(-1).intermediate)) &&
        gate === "OR"
      ) {
        arr.at(-1).resultCarry = outputWire;
        break;
      }
    }
    console.log(arr.at(-1));
    if (
      !arr.at(-1).resultCarry ||
      !arr.at(-1).result ||
      !arr.at(-1).carry ||
      !arr.at(-1).sum ||
      !arr.at(-1).intermediate
    ) {
      const zWire = `z${i.toString().padStart(2, "0")}`;
      for (const { input1, input2, gate, outputWire } of gateConnections) {
        if (outputWire === zWire) {
          console.log({ input1, input2, gate, outputWire });
          for (const {
            input1: a,
            input2: b,
            gate: c,
            outputWire,
          } of gateConnections) {
            if (outputWire === input1) {
              console.log({ input1: a, input2: b, gate: c, outputWire });
            }
            if (outputWire === input2) {
              console.log({ input1: a, input2: b, gate: c, outputWire });
            }
          }
          break;
        }
      }
      break;
    }
  }

  console.log(sumStr);
  console.log(zValue);
}

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
