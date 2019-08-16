let bread = {
  name: 'Bread',
  health: 100,
  items: []
};

let toast = {
  name: 'Toast',
  health: 100,
  items: []
}

let items = {
  sword: { name: 'Sword', damageMod: 1.5, defenseMod: 0.75, description: 'Just a simple metal sword. x1.5 damage, x0.75 defense.' },
  shield: { name: 'Shield', damageMod: 0.75, defenseMod: 1.5, description: 'A metal wall to hide behind. x0.75 damage, x1.5 defense.' },
  armor: { name: 'Armor', damageMod: 0.5, defenseMod: 2, description: "Can't carry a shield? Just wear it! x0.5 damage, x2 defense." },
  bow: { name: 'Bow', damageMod: 2, defenseMod: 0.5, description: "For when you don't want to get too close. x2 damage, x0.5 defense." }
}

let rounds = 0;

function reset() {
  toast.health = 100;
  bread.health = 100;
  for (let i = 0; i < 3; i++) {
    toast.items.pop();
    bread.items.pop();
  }
  document.querySelector('#your-inventory').innerHTML = '<dt>Your Inventory:</dt>';
  document.querySelector('#enemy-inventory').innerHTML = "<dt>Bread's Inventory:</dt>";
  document.querySelector('#your-feedback').textContent = "";
  document.querySelector('#enemy-feedback').textContent = "";
  rounds = 0;
  draw();
}

function hit(dmg) {
  let damageDealt = addMods(dmg, bread, toast);
  bread.health -= damageDealt;
  document.querySelector('#enemy-feedback').textContent = `You dealt ` + damageDealt + ` damage.`;
  advanceRound();
}

function getHit(dmg) {
  let damageDealt = addMods(dmg, toast, bread);
  toast.health -= damageDealt;
  document.querySelector('#your-feedback').textContent = `You took ` + damageDealt + ` damage.`;
}

function addMods(dmg, target, attacker) {
  let totalDmg = dmg;
  for (let i in attacker.items) {
    totalDmg *= attacker.items[i].damageMod;
  }
  for (let i in target.items) {
    totalDmg /= target.items[i].defenseMod;
  }
  return Math.ceil(totalDmg);
}

function advanceRound() {
  let newItem = Math.floor(Math.random() * 3);
  switch (newItem) {
    case 0:
      giveBread(items.sword);
      break;
    case 1:
      giveBread(items.shield);
      break;
    case 2:
      giveBread(items.armor);
      break;
    case 3:
      giveBread(items.bow);
      break;
  };
  rounds++;
  draw();
}

function giveToast(item) {
  let inventory = document.querySelector('#your-inventory');
  if (toast.items.length < 3) {
    toast.items.push(item);
    inventory.innerHTML += '<dt>' + item.name + '</dt><dd>' + item.description + '</dd>';
  };
  advanceRound();
}

function giveBread(item) {
  let inventory = document.querySelector('#enemy-inventory');
  if (bread.items.length < 3) {
    bread.items.push(item);
    inventory.innerHTML += '<dt>' + item.name + '</dt><dd>' + item.description + '</dd>';
  };

}


function draw() {

  let enemyHealthText = document.querySelector('#enemy-health');
  enemyHealthText.textContent = bread.health.toString();
  let yourHealthText = document.querySelector('#your-health');
  yourHealthText.textContent = toast.health.toString();
  let nameText = document.querySelector('#enemy-name');
  nameText.textContent = bread.name;
  let roundsText = document.querySelector('#rounds');
  roundsText.textContent = rounds.toString();
}

draw();