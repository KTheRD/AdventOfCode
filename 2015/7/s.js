const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");

const wires = new Map();

const emulate = (wireString) => {
  const [command, target] = wireString.split(" -> ");
  if (/^\w+$/.test(command)) {
    if (!isNaN(Number(command))) {
      wires.set(target, Number(command));
      return true;
    } else if (wires.has(command)) {
      wires.set(target, wires.get(command));
      return true;
    } else {
      return false;
    }
  }
  if (/NOT \w+/.test(command)) {
    const [_, source] = command.split(" ");
    if (!isNaN(Number(source))) {
      wires.set(target, ~Number(source) & 0xffff);
      return true;
    } else if (wires.has(source)) {
      wires.set(target, ~wires.get(source) & 0xffff);
      return true;
    } else {
      return false;
    }
  }

  const [source1, operator, source2] = command.split(" ");
  let source1Value;
  if (!isNaN(Number(source1))) {
    source1Value = Number(source1);
  } else if (wires.has(source1)) {
    source1Value = wires.get(source1);
  } else {
    return false;
  }

  let source2Value;
  if (!isNaN(Number(source2))) {
    source2Value = Number(source2);
  } else if (wires.has(source2)) {
    source2Value = wires.get(source2);
  } else {
    return false;
  }

  switch (operator) {
    case "AND":
      wires.set(target, source1Value & source2Value & 0xffff);
      return true;
    case "OR":
      wires.set(target, (source1Value | source2Value) & 0xffff);
      return true;
    case "LSHIFT":
      wires.set(target, (source1Value << source2Value) & 0xffff);
      return true;
    case "RSHIFT":
      wires.set(target, (source1Value >> source2Value) & 0xffff);
      return true;
  }
};

let leftovers = input;

while (leftovers.length) {
  const newLeftovers = [];

  for (const wireString of leftovers) {
    if (!emulate(wireString)) {
      newLeftovers.push(wireString);
    }
  }
  leftovers = newLeftovers;
}

console.log(wires.get("a"));

const wires2 = new Map();

wires2.set("b", wires.get("a"));

const emulate2 = (wires2tring) => {
  const [command, target] = wires2tring.split(" -> ");

  if (target === "b") {
    return true;
  }

  if (/^\w+$/.test(command)) {
    if (!isNaN(Number(command))) {
      wires2.set(target, Number(command));
      return true;
    } else if (wires2.has(command)) {
      wires2.set(target, wires2.get(command));
      return true;
    } else {
      return false;
    }
  }
  if (/NOT \w+/.test(command)) {
    const [_, source] = command.split(" ");
    if (!isNaN(Number(source))) {
      wires2.set(target, ~Number(source) & 0xffff);
      return true;
    } else if (wires2.has(source)) {
      wires2.set(target, ~wires2.get(source) & 0xffff);
      return true;
    } else {
      return false;
    }
  }

  const [source1, operator, source2] = command.split(" ");
  let source1Value;
  if (!isNaN(Number(source1))) {
    source1Value = Number(source1);
  } else if (wires2.has(source1)) {
    source1Value = wires2.get(source1);
  } else {
    return false;
  }

  let source2Value;
  if (!isNaN(Number(source2))) {
    source2Value = Number(source2);
  } else if (wires2.has(source2)) {
    source2Value = wires2.get(source2);
  } else {
    return false;
  }

  switch (operator) {
    case "AND":
      wires2.set(target, source1Value & source2Value & 0xffff);
      return true;
    case "OR":
      wires2.set(target, (source1Value | source2Value) & 0xffff);
      return true;
    case "LSHIFT":
      wires2.set(target, (source1Value << source2Value) & 0xffff);
      return true;
    case "RSHIFT":
      wires2.set(target, (source1Value >> source2Value) & 0xffff);
      return true;
  }
};

let leftovers2 = input;

while (leftovers2.length) {
  const newLeftovers = [];

  for (const wireString of leftovers2) {
    if (!emulate2(wireString)) {
      newLeftovers.push(wireString);
    }
  }
  leftovers2 = newLeftovers;
}

console.log(wires2.get("a"));
