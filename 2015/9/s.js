const input = require("fs").readFileSync("./input", "utf-8").trim().split("\n");

const locations = new Map();

input.forEach((line) => {
  const [_, from, to, distanceStr] = line.match(/(\w+) to (\w+) = (\d+)/);
  const distance = parseInt(distanceStr);

  if (!locations.has(from)) {
    locations.set(from, new Map());
  }

  if (!locations.has(to)) {
    locations.set(to, new Map());
  }

  locations.get(from).set(to, distance);
  locations.get(to).set(from, distance);
});

let minDistance = Infinity;

const computeMinDistance = (visited, currentLocation, distance) => {
  if (distance > minDistance) {
    return;
  }

  if (visited.size === locations.size) {
    minDistance = distance;
    return;
  }

  for (const [location, distanceTo] of locations.get(currentLocation)) {
    if (!visited.has(location)) {
      visited.add(location);
      computeMinDistance(visited, location, distance + distanceTo);
      visited.delete(location);
    }
  }
};

for (const [location] of locations) {
  computeMinDistance(new Set([location]), location, 0);
}

console.log(minDistance);

let maxDistance = 0;

const computeMaxDistance = (visited, currentLocation, distance) => {
  if (visited.size === locations.size) {
    maxDistance = Math.max(distance, maxDistance);
    return;
  }

  for (const [location, distanceTo] of locations.get(currentLocation)) {
    if (!visited.has(location)) {
      visited.add(location);
      computeMaxDistance(visited, location, distance + distanceTo);
      visited.delete(location);
    }
  }
};

for (const [location] of locations) {
  computeMaxDistance(new Set([location]), location, 0);
}

console.log(maxDistance);
