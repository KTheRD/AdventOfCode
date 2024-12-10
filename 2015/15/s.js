const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");

const ingredients = input.map((line) => {
  const [_, name, capacity, durability, flavor, texture, calories] = line.match(
    /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/,
  );
  return {
    name,
    capacity: +capacity,
    durability: +durability,
    flavor: +flavor,
    texture: +texture,
    calories: +calories,
  };
});

let maxScore = 0;

for (let i = 0; i <= 100; i++) {
  for (let j = 0; j <= 100 - i; j++) {
    for (let k = 0; k <= 100 - i - j; k++) {
      const l = 100 - i - j - k;
      const capacity = Math.max(
        0,
        i * ingredients[0].capacity +
          j * ingredients[1].capacity +
          k * ingredients[2].capacity +
          l * ingredients[3].capacity,
      );
      const durability = Math.max(
        0,
        i * ingredients[0].durability +
          j * ingredients[1].durability +
          k * ingredients[2].durability +
          l * ingredients[3].durability,
      );
      const flavor = Math.max(
        0,
        i * ingredients[0].flavor +
          j * ingredients[1].flavor +
          k * ingredients[2].flavor +
          l * ingredients[3].flavor,
      );
      const texture = Math.max(
        0,
        i * ingredients[0].texture +
          j * ingredients[1].texture +
          k * ingredients[2].texture +
          l * ingredients[3].texture,
      );
      const score = capacity * durability * flavor * texture;
      maxScore = Math.max(maxScore, score);
    }
  }
}

console.log(maxScore);

let maxScore500Calories = 0;

for (let i = 0; i <= 100; i++) {
  for (let j = 0; j <= 100 - i; j++) {
    for (let k = 0; k <= 100 - i - j; k++) {
      const l = 100 - i - j - k;
      const capacity = Math.max(
        0,
        i * ingredients[0].capacity +
          j * ingredients[1].capacity +
          k * ingredients[2].capacity +
          l * ingredients[3].capacity,
      );
      const durability = Math.max(
        0,
        i * ingredients[0].durability +
          j * ingredients[1].durability +
          k * ingredients[2].durability +
          l * ingredients[3].durability,
      );
      const flavor = Math.max(
        0,
        i * ingredients[0].flavor +
          j * ingredients[1].flavor +
          k * ingredients[2].flavor +
          l * ingredients[3].flavor,
      );
      const texture = Math.max(
        0,
        i * ingredients[0].texture +
          j * ingredients[1].texture +
          k * ingredients[2].texture +
          l * ingredients[3].texture,
      );
      const calories =
        i * ingredients[0].calories +
        j * ingredients[1].calories +
        k * ingredients[2].calories +
        l * ingredients[3].calories;
      if (calories === 500) {
        const score = capacity * durability * flavor * texture;
        maxScore500Calories = Math.max(maxScore500Calories, score);
      }
    }
  }
}

console.log(maxScore500Calories);
