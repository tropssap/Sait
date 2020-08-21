const attackValue = 10;
const strongAttackValue = 17;
const monsterAttackValue = 14;
const healValue = 14;
let chosenMaxLife = parseInt(prompt("Enter Maximum value", "100"));
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
  alert("chosenMaxLife set to 100!!");
}
adjustHealthBars(chosenMaxLife);

function attackHandler() {
  attackMonster(attackValue);
}

function reset() {
  currentPlayerHealth = chosenMaxLife;
  currentMonsterHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function strongAttackHandler() {
  attackMonster(strongAttackValue);
}

function attackMonster(valueAtack) {
  const intialPlayerHealth = currentPlayerHealth;
  const damage = dealMonsterDamage(valueAtack);
  currentMonsterHealth -= damage;
  const monsterDamage = dealPlayerDamage(monsterAttackValue);
  currentPlayerHealth -= monsterDamage;
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = intialPlayerHealth;
    alert("You consumed bonus life =(");
    setPlayerHealth(intialPlayerHealth);
  }
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost!");
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("You have a draw!");
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function healPlayerHandler() {
  let valueHeal;
  if (currentPlayerHealth >= chosenMaxLife - healValue) {
    alert("You can't heal to more than your max health");
    valueHeal = chosenMaxLife - currentPlayerHealth;
  } else {
    valueHeal = healValue;
  }
  increasePlayerHealth(valueHeal);
  currentPlayerHealth += valueHeal;
  attackMonster(0);
}
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
