let nave;
let disparos = [];
let enemigos = [];
let balasEnemigas = []; 
let direccionEnemigo = 1;
let nivelActual = 1;
let rolita;
let tiro;
let enemigoTiro;
let boss;
let playerName = "";
let showNameInput = true;
let scores = [];

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
  tiro = loadSound("images/gun.mp3");
  enemigoTiro = loadSound("images/enemigo.mp3");
}

function setup() {
  let canvas = createCanvas(700, 700);
  canvas.parent("canvas-container");
  canvas.hide();

  cargarTopScores();
    
  document.getElementById('name-input').style.display = 'flex';
    
  document.getElementById('start-game').addEventListener('click', function() {
      playerName = document.getElementById('player-name').value.trim() || "Jugador";
      document.getElementById('name-input').style.display = 'none';
      canvas.show();
      iniciarNivel1();
      gameState = "nivel1";
  });
}

function draw() {
  imageMode(CORNER);
  image(fondoImg, 0, 0, width, height);

  switch (gameState) {
    case "menu":
      mostrarMenu();
      break;

    case "nivel1":
      nivel1(); 
      break;

    case "transicion":
      transicion(); 
      break;

    case "nivel2":
      nivel2(); 
      break;

    case "nivel3":
      nivel3(); 
      break;

    case "ganaste":
      mostrarVictoria();
      break;

    case "perdiste":
      mostrarDerrota();
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

    if (key === ' ') {
        tiro.play();
    }

    if (gameState === "nivel1" || gameState === "nivel2" || gameState === "nivel3") {
        if (keyCode === LEFT_ARROW) nave.mover(-2.5);
        if (keyCode === RIGHT_ARROW) nave.mover(2.5);
        if (key === ' ') nave.disparar();
    }

    if ((gameState === "ganaste" || gameState === "perdiste") && key === 'Enter') {
        resetGame();
    }
}