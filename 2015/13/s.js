const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");
// const input = `
// Alice would gain 54 happiness units by sitting next to Bob.
// Alice would lose 79 happiness units by sitting next to Carol.
// Alice would lose 2 happiness units by sitting next to David.
// Bob would gain 83 happiness units by sitting next to Alice.
// Bob would lose 7 happiness units by sitting next to Carol.
// Bob would lose 63 happiness units by sitting next to David.
// Carol would lose 62 happiness units by sitting next to Alice.
// Carol would gain 60 happiness units by sitting next to Bob.
// Carol would gain 55 happiness units by sitting next to David.
// David would gain 46 happiness units by sitting next to Alice.
// David would lose 7 happiness units by sitting next to Bob.
// David would gain 41 happiness units by sitting next to Carol.
// `
//   .trim()
//   .split("\n");

const guests = new Map();

for (const line of input) {
  const [_, nameA, gainOrLoss, amountStr, nameB] = line.match(
    /(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)/,
  );

  const amount = parseInt(amountStr, 10) * (gainOrLoss === "gain" ? 1 : -1);

  if (!guests.has(nameA)) {
    guests.set(nameA, new Map());
  }
  guests.get(nameA).set(nameB, amount);
}

let maximumHappiness = 0;

const getMaximumHappiness = (guests, seated, current, start, amount) => {
  if (seated.size === guests.size) {
    maximumHappiness = Math.max(
      maximumHappiness,
      amount + guests.get(start).get(current) + guests.get(current).get(start),
    );
    return;
  }

  for (const [guest] of guests) {
    if (!seated.has(guest)) {
      seated.add(guest);
      getMaximumHappiness(
        guests,
        seated,
        guest,
        start,
        amount +
        guests.get(current).get(guest) +
        guests.get(guest).get(current),
      );
      seated.delete(guest);
    }
  }
};

for (const [guest] of guests) {
  getMaximumHappiness(guests, new Set([guest]), guest, guest, 0);
}

console.log(maximumHappiness);

guests.set("me", new Map());
for (const [guest] of guests) {
  guests.get(guest).set("me", 0);
  guests.get("me").set(guest, 0);
}

maximumHappiness = 0;

for (const [guest] of guests) {
  getMaximumHappiness(guests, new Set([guest]), guest, guest, 0);
}

console.log(maximumHappiness);
