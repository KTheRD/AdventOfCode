const input = require("fs")
  .readFileSync("./input", "utf-8")
  .trim()
  .split(/: |\n/);

const [_, bossHP, __, bossDamage, ___, bossArmor] = input;
const [weaponsStr, armorStr, ringsStr] = `Weapons:    Cost  Damage  Armor
Dagger        8     4       0
Shortsword   10     5       0
Warhammer    25     6       0
Longsword    40     7       0
Greataxe     74     8       0

Armor:      Cost  Damage  Armor
Leather      13     0       1
Chainmail    31     0       2
Splintmail   53     0       3
Bandedmail   75     0       4
Platemail   102     0       5

Rings:      Cost  Damage  Armor
Damage +1    25     1       0
Damage +2    50     2       0
Damage +3   100     3       0
Defense +1   20     0       1
Defense +2   40     0       2
Defense +3   80     0       3`.split("\n\n");

const weapons = weaponsStr
  .split("\n")
  .slice(1)
  .map((w) => {
    const [name, cost, damage, armor] = w.split(/\s+/);
    return { name, cost: +cost, damage: +damage, armor: +armor };
  });

const armors = armorStr
  .split("\n")
  .slice(1)
  .map((a) => {
    const [name, cost, damage, armor] = a.split(/\s+/);
    return { name, cost: +cost, damage: +damage, armor: +armor };
  });

const rings = ringsStr
  .split("\n")
  .slice(1)
  .map((r) => {
    const [name, cost, damage, armor] = r.split(/\s\s+/);
    return { name, cost: +cost, damage: +damage, armor: +armor };
  });

armors.push({ name: "None", cost: 0, damage: 0, armor: 0 });
rings.push({ name: "None", cost: 0, damage: 0, armor: 0 });
rings.push({ name: "None2", cost: 0, damage: 0, armor: 0 });

const canWin = (
  bossHP,
  bossDamage,
  bossArmor,
  playerHP,
  playerDamage,
  playerArmor,
) => {
  const playerAttack = Math.max(1, playerDamage - bossArmor);
  const bossAttack = Math.max(1, bossDamage - playerArmor);
  bossHP -= playerAttack;
  if (bossHP <= 0) return true;
  const turnsToWin = Math.ceil(bossHP / playerAttack);
  const turnsToLose = Math.ceil(playerHP / bossAttack);
  return turnsToWin < turnsToLose;
};

let minCost = Infinity;

for (const weapon of weapons) {
  for (const armor of armors) {
    for (const ring1 of rings) {
      for (const ring2 of rings) {
        if (ring1.name === ring2.name) continue;
        const cost = weapon.cost + armor.cost + ring1.cost + ring2.cost;
        const damage = weapon.damage + ring1.damage + ring2.damage;
        const armorRating = armor.armor + ring1.armor + ring2.armor;
        if (canWin(bossHP, bossDamage, bossArmor, 100, damage, armorRating)) {
          minCost = Math.min(minCost, cost);
        }
      }
    }
  }
}

console.log(minCost);

let maxCost = 0;

for (const weapon of weapons) {
  for (const armor of armors) {
    for (const ring1 of rings) {
      for (const ring2 of rings) {
        if (ring1.name === ring2.name) continue;
        const cost = weapon.cost + armor.cost + ring1.cost + ring2.cost;
        const damage = weapon.damage + ring1.damage + ring2.damage;
        const armorRating = armor.armor + ring1.armor + ring2.armor;
        if (!canWin(bossHP, bossDamage, bossArmor, 100, damage, armorRating)) {
          maxCost = Math.max(maxCost, cost);
        }
      }
    }
  }
}

console.log(maxCost);
