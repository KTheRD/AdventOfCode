const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");
const bots = new Map();
let botsState = new Map();
for (const line of input) {
  if (line.startsWith("value")) {
    const [value, bot] = line.match(/\d+/g);
    if (!botsState.has(bot)) {
      botsState.set(bot, [Number(value)]);
    } else {
      botsState.get(bot).push(Number(value));
    }
  } else {
    const [, bot, , , , outputOrBotLow, low, , , , outputOrBotHigh, high] =
      line.split(" ");
    if (!bots.has(bot)) {
      bots.set(bot, {
        id: bot,
        low: { type: outputOrBotLow, id: low },
        high: { type: outputOrBotHigh, id: high },
      });
    }
  }
}

const outputs = new Map();
let foundBot = false;
while (true) {
  const nextState = new Map();
  for (const [bot, values] of botsState) {
    if (values.length === 2) {
      const [lowHas, highHas] = values.sort((a, b) => a - b);
      if (lowHas === 17 && highHas === 61) {
        console.log(bot);
        foundBot = true;
      }
      const { low, high } = bots.get(bot);
      if (low.type === "bot") {
        if (!nextState.has(low.id)) {
          if (botsState.has(low.id) && botsState.get(low.id).length === 1) {
            nextState.set(low.id, [...botsState.get(low.id), lowHas]);
          } else {
            nextState.set(low.id, [lowHas]);
          }
        } else {
          nextState.get(low.id).push(lowHas);
        }
      } else {
        if (!outputs.has(low.id)) {
          outputs.set(low.id, lowHas);
        }
      }
      if (high.type === "bot") {
        if (!nextState.has(high.id)) {
          if (botsState.has(high.id) && botsState.get(high.id).length === 1) {
            nextState.set(high.id, [...botsState.get(high.id), highHas]);
          } else {
            nextState.set(high.id, [highHas]);
          }
        } else {
          nextState.get(high.id).push(highHas);
        }
      } else {
        if (!outputs.has(high.id)) {
          outputs.set(high.id, highHas);
        }
      }
    } else {
      if (!nextState.has(bot)) {
        nextState.set(bot, values);
      }
    }
  }
  if (foundBot && outputs.has("0") && outputs.has("1") && outputs.has("2")) {
    break;
  }
  botsState = nextState;
}
console.log(outputs);
console.log(outputs.get("0") * outputs.get("1") * outputs.get("2"));
