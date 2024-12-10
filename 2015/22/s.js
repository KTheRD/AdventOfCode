const input = require("fs").readFileSync("./input", "utf-8").trim();

const [_, initialBossHP, __, bossDamage] = input.split(/\n|: /).map(Number);

let minMana = Infinity;
const playerTurn = (
  playerHP = 50,
  playerMana = 500,
  bossHP = initialBossHP,
  shield = 0,
  poison = 0,
  recharge = 0,
  spentMana = 0,
  history = [],
) => {
  playerHP--;
  if (shield > 0) {
    shield--;
  }
  if (poison > 0) {
    poison--;
    bossHP -= 3;
  }
  if (recharge > 0) {
    recharge--;
    playerMana += 101;
  }

  if (spentMana >= minMana) return;
  if (playerHP <= 0) return;
  if (bossHP <= 0) {
    minMana = Math.min(minMana, spentMana);
    console.log(history);
    return;
  }

  // Magic Missile
  if (playerMana >= 53) {
    bossTurn(
      playerHP,
      playerMana - 53,
      bossHP - 4,
      shield,
      poison,
      recharge,
      spentMana + 53,
      [...history, "Magic Missile"],
    );
  }

  // Drain
  if (playerMana >= 73) {
    bossTurn(
      playerHP + 2,
      playerMana - 73,
      bossHP - 2,
      shield,
      poison,
      recharge,
      spentMana + 73,
      [...history, "Drain"],
    );
  }

  // Shield
  if (playerMana >= 113 && shield === 0) {
    bossTurn(
      playerHP,
      playerMana - 113,
      bossHP,
      6,
      poison,
      recharge,
      spentMana + 113,
      [...history, "Shield"],
    );
  }

  // Poison
  if (playerMana >= 173 && poison === 0) {
    bossTurn(
      playerHP,
      playerMana - 173,
      bossHP,
      shield,
      6,
      recharge,
      spentMana + 173,
      [...history, "Poison"],
    );
  }

  // Recharge
  if (playerMana >= 229 && recharge === 0) {
    bossTurn(
      playerHP,
      playerMana - 229,
      bossHP,
      shield,
      poison,
      5,
      spentMana + 229,
      [...history, "Recharge"],
    );
  }
};

const bossTurn = (
  playerHP,
  playerMana,
  bossHP,
  shield,
  poison,
  recharge,
  spentMana = 0,
  history,
) => {
  let armor = 0;
  if (shield > 0) {
    shield--;
    armor = 7;
  }

  if (poison > 0) {
    poison--;
    bossHP -= 3;
  }

  if (recharge > 0) {
    recharge--;
    playerMana += 101;
  }

  if (playerHP <= 0) return;
  if (bossHP <= 0) {
    minMana = Math.min(minMana, spentMana);
    console.log(history);
    return;
  }

  playerHP -= Math.max(bossDamage - armor, 1);

  playerTurn(
    playerHP,
    playerMana,
    bossHP,
    shield,
    poison,
    recharge,
    spentMana,
    history,
  );
};

playerTurn();
console.log(minMana);
