const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");

const reindeers = input.map((line) => {
  const [_, name, speed, duration, rest] = line.match(
    /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./,
  );
  return { name, speed: +speed, duration: +duration, rest: +rest };
});

const getDistance = (reindeer, time) => {
  const period = reindeer.duration + reindeer.rest;
  const kmPerPeriod = reindeer.speed * reindeer.duration;
  const periods = Math.floor(time / period);
  const remaining = Math.min(time % period, reindeer.duration);
  return periods * kmPerPeriod + remaining * reindeer.speed;
};

const time = 2503;

const distances = reindeers.map((reindeer) => getDistance(reindeer, time));

console.log(Math.max(...distances));

const scores = Array(reindeers.length).fill(0);

for (let t = 1; t <= time; t++) {
  const distances = reindeers.map((reindeer) => getDistance(reindeer, t));
  const maxDistance = Math.max(...distances);
  distances.forEach((distance, i) => {
    if (distance === maxDistance) {
      scores[i]++;
    }
  });
}

console.log(Math.max(...scores));
