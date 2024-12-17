import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();
// const input = `Register A: 2024
// Register B: 0
// Register C: 0
//
// Program: 0,3,5,4,3,0
// `.trim();

/**
 * @param {string } input
 */
function parseInput(input) {
  const [registersStr, instructionsStr] = input.split("\n\n");
  const [A, B, C] = registersStr.match(/\d+/g);
  const instructions = instructionsStr.split(" ")[1].split(",").map(Number);
  return { A, B, C, instructions };
}

function part1({ A, B, C, instructions }) {
  let Avalue = A;
  let Bvalue = B;
  let Cvalue = C;

  /** @param {number} i */
  const getCombo = (i) => {
    switch (i) {
      case 0:
      case 1:
      case 2:
      case 3:
        return i;
      case 4:
        return Avalue;
      case 5:
        return Bvalue;
      case 6:
        return Cvalue;
    }
  };

  const result = [];
  for (let i = 0; i < instructions.length; i += 2) {
    switch (instructions[i]) {
      case 0:
        Avalue = Math.trunc(
          Avalue / Math.pow(2, getCombo(instructions[i + 1])),
        );
        break;
      case 1:
        Bvalue = Bvalue ^ instructions[i + 1];
        break;
      case 2:
        Bvalue = getCombo(instructions[i + 1]) % 8;
        break;
      case 3:
        if (Avalue === 0) {
          break;
        }
        i = instructions[i + 1] - 2;
        break;
      case 4:
        Bvalue = Bvalue ^ Cvalue;
        break;
      case 5:
        result.push(getCombo(instructions[i + 1]) % 8);
        break;
      case 6:
        Bvalue = Math.trunc(
          Avalue / Math.pow(2, getCombo(instructions[i + 1])),
        );
        break;
      case 7:
        Cvalue = Math.trunc(
          Avalue / Math.pow(2, getCombo(instructions[i + 1])),
        );
        break;
    }
  }

  return result.join(",");
}

function getOuput({ A, B, C, instructions }) {
  let Avalue = A;
  let Bvalue = B;
  let Cvalue = C;

  /** @param {BigInt} i */
  const getCombo = (i) => {
    switch (i) {
      case 0n:
      case 1n:
      case 2n:
      case 3n:
        return i;
      case 4n:
        return Avalue;
      case 5n:
        return Bvalue;
      case 6n:
        return Cvalue;
    }
  };

  const result = [];
  for (let i = 0; i < instructions.length; i += 2) {
    switch (instructions[i]) {
      case 0n:
        Avalue =
          Avalue / BigInt(Math.pow(2, Number(getCombo(instructions[i + 1]))));
        break;
      case 1n:
        Bvalue = Bvalue ^ instructions[i + 1];
        break;
      case 2n:
        Bvalue = getCombo(instructions[i + 1]) % 8n;
        break;
      case 3n:
        if (Avalue === 0n) {
          break;
        }
        i = Number(instructions[i + 1]) - 2;
        break;
      case 4n:
        Bvalue = Bvalue ^ Cvalue;
        break;
      case 5n:
        result.push(getCombo(instructions[i + 1]) % 8n);
        break;
      case 6n:
        Bvalue =
          Avalue / BigInt(Math.pow(2, Number(getCombo(instructions[i + 1]))));
        break;
      case 7n:
        Cvalue =
          Avalue / BigInt(Math.pow(2, Number(getCombo(instructions[i + 1]))));
        break;
    }
  }

  return result;
}

/**
 * @param {{ A: any; B: any; C: any; instructions: any[]; }} input
 */
function part2({ B, C, instructions }) {
  instructions = instructions.map(BigInt);
  let possibleA = [0n];
  for (let i = instructions.length - 1; i >= 0; i--) {
    const newPossibleA = [];
    for (const A of possibleA) {
      for (let rem = 0n; rem < 8n; rem++) {
        const result = getOuput({ A: A * 8n + rem, B, C, instructions });
        if (result[0] === instructions[i]) {
          console.log(A * 8n + rem, result);
          newPossibleA.push(A * 8n + rem);
        }
      }
    }
    possibleA = newPossibleA;
  }
  return Math.min(...possibleA.map((a) => Number(a)));
}

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
