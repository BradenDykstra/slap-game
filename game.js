let enemy = {
  name: 'Enemy',
  health: 100
};

let rounds = 0;

function slap() {
  enemy.health -= 1;
  rounds++;
  draw();
}

function punch() {
  enemy.health -= 5;
  rounds++;
  draw();
}

function kick() {
  enemy.health -= 10;
  rounds++;
  draw();
}

function draw() {
  let healthText = document.querySelector('#health');
  healthText.textContent = enemy.health.toString();
  let nameText = document.querySelector('#enemy-name');
  nameText.textContent = enemy.name;
  let roundsText = document.querySelector('#rounds');
  roundsText.textContent = rounds.toString();
}

draw();