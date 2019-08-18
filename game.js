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
  document.querySelector('#toast-modifiers').innerHTML = '<dt>Modifiers:</dt>';
  document.querySelector('#bread-modifiers').innerHTML = '<dt>Modifiers:</dt>';
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
  if (bread.health <= 0) {
    document.querySelector('#enemy-feedback').innerHTML = '<img src="ko.jpg" alt="K.O." width="150px" />';
  }
  breadAction();
  if (toast.health <= 0) {
    document.querySelector('#your-feedback').innerHTML = '<img src="ko.jpg" alt="K.O." width="150px" />';
  }
  rounds++;
  draw();
}

function breadAction() {
  let action = Math.floor(Math.random() * 2);
  if (bread.items.length > 2) {
    action = 0;
  }
  switch (action) {
    case 0:
      getHit(Math.floor(Math.random() * 3))
      console.log("Bread attacks")
      break;
    case 1:
      giveBread(Math.floor(Math.random() * 4))
      console.log("Bread picks up an item")
      break;
  }
}

function giveToast(item) {
  let inventory = document.querySelector('#your-inventory');
  if (toast.items.length < 3) {
    toast.items.push(item);
    inventory.innerHTML += '<dd>' + item.name + '</dd>';
    document.querySelector('#toast-modifiers').innerHTML += '<dd>x' + item.damageMod + ' damage, x' + item.defenseMod + ' defense.'
  };
  advanceRound();
}

function giveBread(item) {
  let inventory = document.querySelector('#enemy-inventory');
  if (bread.items.length < 3) {
    switch (item) {
      case 0:
        bread.items.push(items.sword);
        inventory.innerHTML += '<dd>Sword</dd>'
        document.querySelector('#bread-modifiers').innerHTML += '<dd>x' + items.sword.damageMod + ' damage, x' + items.sword.defenseMod + ' defense.'
        break;
      case 1:
        bread.items.push(items.shield);
        inventory.innerHTML += '<dd>Shield</dd>'
        document.querySelector('#bread-modifiers').innerHTML += '<dd>x' + items.shield.damageMod + ' damage, x' + items.shield.defenseMod + ' defense.'
        break;
      case 2:
        bread.items.push(items.armor);
        inventory.innerHTML += '<dd>Armor</dd>'
        document.querySelector('#bread-modifiers').innerHTML += '<dd>x' + items.armor.damageMod + ' damage, x' + items.armor.defenseMod + ' defense.'
        break;
      case 3:
        bread.items.push(items.bow);
        inventory.innerHTML += '<dd>Bow</dd>'
        document.querySelector('#bread-modifiers').innerHTML += '<dd>x' + items.bow.damageMod + ' damage, x' + items.bow.defenseMod + ' defense.'
        break;
    }
  };
}


function draw() {
  document.getElementById('your-health-bar').style.width = toast.health + '%';
  document.getElementById('enemy-health-bar').style.width = bread.health + '%';
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