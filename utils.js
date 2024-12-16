export const dirs = [
  { x: -1, y: 0 }, // north
  { x: 0, y: 1 }, // east
  { x: 1, y: 0 }, // south
  { x: 0, y: -1 }, // west
];
export const dirsD = [
  { x: 0, y: -1 }, // north
  { x: 1, y: -1 }, // north-east
  { x: 1, y: 0 }, // east
  { x: 1, y: 1 }, // south-east
  { x: 0, y: 1 }, // south
  { x: -1, y: 1 }, // south-west
  { x: -1, y: 0 }, // west
  { x: -1, y: -1 }, // north-west
];
export const dirsN = {
  north: { x: 0, y: -1 },
  "north-east": { x: 1, y: -1 },
  east: { x: 1, y: 0 },
  "south-east": { x: 1, y: 1 },
  south: { x: 0, y: 1 },
  "south-west": { x: -1, y: 1 },
  west: { x: -1, y: 0 },
  "north-west": { x: -1, y: -1 },
};
