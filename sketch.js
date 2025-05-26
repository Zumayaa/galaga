let nave;
let disparos = [];
let enemigos = [];
let enemyBullets = []; 
let direccionEnemigo = 1;



let puntaje = 0;
let vidas = 3;
let gameState = "menu"; // 'menu', 'nivel1', 'transicion', 'nivel2', etc.
let siguienteNivel = "";
let tiempoTransicion = 100;

function preload(){
  imgTitulo = loadImage('images/title.png'); 
  enemieImg = loadImage('images/enemigo.png');
  erraticEnemyImg = loadImage('images/enemigo.png');
  strongEnemyImg = loadImage('images/enemigo.png');  
}

function setup() {
  createCanvas(700, 700);
  nave = new Nave();
  cargarTopScores();
}

function draw() {
  background(0);

  switch (gameState) {
    case "menu":
      mostrarMenu();
      break;

    case "nivel1":
      nivel1(); // <- viene de nivel1.js
      break;

    case "transicion":
      transicion(); // <- viene de interfaz.js
      break;

    case "nivel2":
      nivel2(); // más adelante
      break;

    case "nivel3":
      nivel3(); // más adelante
      break;

    case "ganaste":
      mostrarVictoria();
      break;

    case "perdiste":
      perdiste();
      break;
  }
}

function keyPressed() {
  if (gameState === "menu" && key === 'Enter') {
    iniciarNivel1();
    gameState = "nivel1";
  }
  

  if (gameState === "nivel1" || gameState === "nivel2" || gameState === "nivel3") {
    if (keyCode === LEFT_ARROW) nave.mover(-1);
    if (keyCode === RIGHT_ARROW) nave.mover(1);
    if (key === ' ') nave.disparar();
  }

  if ((gameState === "ganaste" || gameState === "perdiste") && key === 'Enter') {
    location.reload();
  }
}
