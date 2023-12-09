const input = require("fs").readFileSync("input", "utf-8").split("\n");
input.pop();

const getHandType = (hand) => {
  const handMap = hand.split("").reduce((acc, c) => {
    if (acc[c]) {
      acc[c]++;
      return acc;
    }
    acc[c] = 1;
    return acc;
  }, {});

  const count = [];
  for (const c in handMap) {
    if (c === "J") continue;
    count.push(handMap[c]);
  }

  const J = handMap["J"] ?? 0;

  count.sort((a, b) => b - a);

  if (J === 5) return 7;

  if (count[0] + J === 5) return 7;
  if (count[0] + J === 4) return 6;
  if (count[0] + J === 3 && count[1] === 2) return 5;
  if (count[0] + J === 3) return 4;
  if (count[0] === 2 && count[1] === 2) return 3;
  if (count[0] + J === 2) return 2;
  return 1;
};

const compareCards = (a, b) => {
  const cards = "AKQT98765432J";

  for (let i = 0; i < 5; i++) {
    if (cards.indexOf(a[i]) < cards.indexOf(b[i])) return 1;
    if (cards.indexOf(a[i]) > cards.indexOf(b[i])) return -1;
  }
  return 0;
};

const compareHands = (a, b) => {
  if (a.type > b.type) return 1;
  if (a.type < b.type) return -1;
  return compareCards(a.hand, b.hand);
};

const hands = input.map((s) => {
  const [hand, bet] = s.split(" ");
  return { hand, bet: +bet, type: getHandType(hand) };
});

hands.sort(compareHands);

const answer = hands
  .map((h, i) => (i + 1) * h.bet)
  .reduce((acc, b) => acc + b, 0);

console.log(answer);
