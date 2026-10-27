let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Palo de madera"];
let fondoMusica;
let efectoP;
let dragonSound;

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const statsColor = document.querySelector("#stats");
const fondo = document.body;
const weapons = [
  { name: "Palo de madera", power: 5 },
  { name: "Daga", power: 30 },
  { name: "Gran martillo", power: 50 },
  { name: "Espada", power: 100 },
  { name: "Espada encantada", power: 150 },
  { name: "Terraprisma", power: 500 },
];
const monsters = [
  {
    name: "Rana de slime",
    level: 2,
    health: 15,
  },
  {
    name: "Bestia con colmillos",
    level: 8,
    health: 60,
  },
  {
    name: "Dragón aterrador",
    level: 20,
    health: 300,
  },
];
const locations = [
  {
    name: "town square",
    "button text": ["Ir a la tienda", "Ir a la cueva", "Pelear con el Dragón"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'Estás en la plaza del pueblo. Ves una señal que dice: "Tienda".',
    fondo: "url(images/aldea-medieval.jpg)",
    textColor: "#594336",
    statsColor: "#020202",
  },
  {
    name: "store",
    "button text": [
      "Comprar 10 de vida (10 de oro)",
      "Comprar nueva arma (30 de oro)",
      "Volver a la plaza del pueblo",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Entras a la tienda.",
    fondo: "url(images/tienda-mediaval.jpg)",
    textColor: "#594336",
    statsColor: "#FFF",
  },
  {
    name: "cave",
    "button text": [
      "Pelear con la rana de slime",
      "Pelear con la bestia de grandes colmillos",
      "Volver a la plaza del pueblo",
    ],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Entras a la cueva y ves algunos monstruos.",
    fondo: "url(images/cueva.jpg)",
    textColor: "#04050D",
    statsColor: "#FFF",
  },
  {
    name: "fight",
    "button text": ["¡Atacar!", "Esquivar", "¡Huir!"],
    "button functions": [attack, dodge, goTown],
    text: "Estás peleando con un monstruo.",
  },
  {
    name: "kill monster",
    "button text": [
      "Volver a la plaza",
      "Volver a la plaza",
      "Volver a la plaza",
    ],
    "button functions": [goTown, goTown, easterEgg],
    text: "El monstruo se retuerce de dolor para finalmente morir.",
  },
  {
    name: "lose",
    "button text": ["¿Intentar de nuevo?", "Opción 1", "Opción 1"],
    "button functions": [restart, restart, restart],
    text: "Haz muerto. &#x2620;",
  },
  {
    name: "win",
    "button text": ["¿Volver a jugar?", "Opción 1", "Opción 1"],
    "button functions": [restart, restart, restart],
    text: "¡Has derrotado al dragón! ¡Felicidades, has ganado el juego! &#x1F389;",
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Volver a la plaza"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Has encontrado un juego secreto. Selecciona uno de los números. Se elegirán 10 números al azar, si el número que elegiste aparece, ¡ganas oro!",
  },
];

//Para música
const musica = [
  {
    direccion: 'sounds/SoulsOfFireDK.mp3'
  },
  {
    direccion: 'sounds/store.mp3'
  },
  {
    direccion: 'sounds/cave.mp3'
  },
  {
    direccion: 'sounds/slime.mp3'
  },
  {
    direccion: 'sounds/dientes.mp3'
  },
  {
    direccion: 'sounds/TaurusDemonDS.mp3'
  },
];

const efectos = [
  {
    efecto: 'sounds/hey!.mp3'
  },
  {
    efecto: 'sounds/cardinal.mp3',
  },
  {
    efecto: 'sounds/coin.mp3',
  },
  {
    efecto: 'sounds/sword.mp3',
  },
  {
    efecto: 'sounds/bossDragon.mp3',
  },
  {
    efecto: 'sounds/slime-punch.mp3',
  },
]

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//Inicializar música

let deathSound = new Audio();

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
  fondo.style.backgroundImage = location.fondo;
  text.style.backgroundColor = location.textColor;
  statsColor.style.color = location.statsColor;
}

function goTown() {
  update(locations[0]);
  pausarMusica();
  activarMusica(musica[0].direccion);
  efectoSingle(efectos[1].efecto);
}

function goStore() {
  update(locations[1]);
  pausarMusica();
  pausarSingle();
  activarMusica(musica[1].direccion);
  efectoSonido(efectos[0].efecto);
}

function goCave() {
  update(locations[2]);
  pausarMusica();
  pausarSingle();
  activarMusica(musica[2].direccion);
  //efectoSonido(efectos[0].efecto);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    efectoSonido(efectos[2].efecto);
  } else {
    text.innerText = "No tienes oro suficiente para comprar más salud.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Has conseguido: " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " En tu inventario hay: " + inventory;
      efectoSonido(efectos[3].efecto);
    } else {
      text.innerText = "No tienes suficiente oro para comprar una nueva arma.";
    }
  } else {
    text.innerText = "¡Ya has conseguido la mejor arma! ¿Deseas vender tu arma?"
    button2.innerText = "Vender arma (Ganas 15 de oro)"
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Has vendido: " + currentWeapon + ".";
    text.innerText += " En tu inventario hay: " + inventory;
    efectoSonido(efectos[2].efecto);
  } else {
    text.innerText = "¡No puedes vender tu única arma!";
  }
}

function fightSlime() {
  fondo.style.backgroundImage = "url(images/bestia-slime.png)";
  text.style.backgroundColor = "#365902",
  fighting = 0;
  pausarMusica();
  activarMusica(musica[3].direccion);
  goFight();
}

function fightBeast() {
  fondo.style.backgroundImage = "url(images/colmillos.jpeg)";
  text.style.backgroundColor = "#011C26";
  fighting = 1;
  pausarMusica();
  activarMusica(musica[4].direccion);
  goFight();
}

function fightDragon() {
  fondo.style.backgroundImage = "url(images/dragon-medieval.jpg)";
  text.style.backgroundColor = "#025373";
  fighting = 2;
  pausarMusica();
  pausarSingle();
  activarMusica(musica[5].direccion);
  efectoDragon(efectos[4].efecto);
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  fondo.style.backgroundImage = location.fondo;
}

function attack() {
  text.innerText = monsters[fighting].name + " ha atacado.";
  text.innerText += " Tu atacas con " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
      efectoSonido(efectos[5].efecto);
  } else {
    text.innerText += " ¡Fallas el ataque!";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  text.innerText = "¡Has esquivado el ataque de " + monsters[fighting].name + "!";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
  pausarMusica();
  pausarDragon();
  soundDied();
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["Palo de madera"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  pauseSoundDied();
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText =
    "¡Has seleccionado!: " + guess + ". Lista de los resultados:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "¡Buena elección! ¡Ganas 20 de oro!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "¡Mala suerte! ¡Pierdes 10 de oro!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}

//Reproducir música
function activarMusica(menuLoop){
  fondoMusica = new Audio(menuLoop);
  fondoMusica.loop = true;
  fondoMusica.volume = 0.3;
  fondoMusica.play();
}

function efectoSonido(efectoDireccion){
  efectoP = new Audio(efectoDireccion);
  efectoP.play();
}

function efectoSingle(efectoDireccion){
  efectoP = new Audio(efectoDireccion);
  efectoP.play();
}

function efectoDragon(efectoDireccion){
  dragonSound = new Audio(efectoDireccion);
  dragonSound.play();
}

function pausarMusica(){
  fondoMusica.pause();
}

function pausarSingle(){
  efectoP.pause();
}

function pausarDragon(){
  dragonSound.pause();
}

function soundDied(){
  deathSound = new Audio('sounds/died.mp3');
  deathSound.play();
}

function pauseSoundDied(){
  deathSound.pause();
};

activarMusica(musica[0].direccion);
