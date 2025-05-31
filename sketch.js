let nave;
let disparos = [];
let enemigos = [];
let balasEnemigas = []; 
let direccionEnemigo = 1;
let nivelActual = 1;
let rolita;




let puntaje = 0;
let vidas = 3;
let gameState = "menu"; // 'menu', 'nivel1', 'transicion', 'nivel2', etc.
let siguienteNivel = "";
let tiempoTransicion = 100;

function preload(){
  imgTitulo = loadImage('images/title.png'); 
  enemieImg = loadImage('images/enemigo.png');
  movelonImg = loadImage('images/enemigo.png');
  tanqueIMG = loadImage('images/enemigo2.png');  
  boss = loadImage('images/boss.png');  
  naveIMG = loadImage('images/nave.png');
  helicoptero = loadImage('images/helicoptero.png');
  fondoImg = loadImage("images/sky.jpg");
  rolita = loadSound("images/song.mp3");
}

function setup() {
  let canvas = createCanvas(700, 700);
  canvas.parent("canvas-container");
  nave = new Nave();
  cargarTopScores();
}

function draw() {
  imageMode(CORNER); // 👈 Esto asegura que se dibuje desde la esquina superior izquierda
  image(fondoImg, 0, 0, width, height);

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
    if (!rolita.isPlaying()) {
      rolita.setVolume(0.5);
      rolita.loop(); 
    }
    iniciarNivel1();
    gameState = "nivel1";
  }
  

  if (gameState === "nivel1" || gameState === "nivel2" || gameState === "nivel3") {
    if (keyCode === LEFT_ARROW) nave.mover(-2.5);
    if (keyCode === RIGHT_ARROW) nave.mover(2.5);
    if (key === ' ') nave.disparar();
  }

  if ((gameState === "ganaste" || gameState === "perdiste") && key === 'Enter') {
    location.reload();
  }
}
