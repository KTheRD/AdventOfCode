const input = require("fs").readFileSync("input", "utf8").trim();

function findLowestHouseWithMinPresents(targetPresents) {
  // We'll use an array to track presents per house
  // Using TypedArray for memory efficiency with large numbers
  const houses = new Uint32Array(targetPresents / 10 + 1);

  // Loop through elves
  for (let elf = 1; elf * 10 <= targetPresents; elf++) {
    // Each elf delivers presents to houses multiples of their number
    for (let house = elf; house < houses.length; house += elf) {
      houses[house] += elf * 10;
    }
  }

  // Find first house with at least target presents
  return houses.findIndex((presents) => presents >= targetPresents);
}

console.log(findLowestHouseWithMinPresents(+input));

// part 2 based on claude's response
function findLowestHouseWithMinPresents2(targetPresents) {
  const houses = new Uint32Array(targetPresents / 10 + 1);

  for (let elf = 1; elf * 11 <= targetPresents; elf++) {
    let visits = 0;
    for (let house = elf; house < houses.length && visits < 50; house += elf) {
      houses[house] += elf * 11;
      visits++;
    }
  }

  return houses.findIndex((presents) => presents >= targetPresents);
}

console.log(findLowestHouseWithMinPresents2(+input));
