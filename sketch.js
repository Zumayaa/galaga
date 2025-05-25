// VARIABLES DEL JUEGO
let nave;
let disparos = [];
let enemigos = [];
let nivel = 1;
let puntaje = 0;
let vidas = 3;
let jugando = false;
let topScores = [];

// FUNCIONES PRINCIPALES
function setup() {
  createCanvas(700, 700);
  nave = new Nave();
  cargarTopScores();
  mostrarTopScores();
}

function draw() {
  background(0);

  if (!jugando) return;

  nave.mostrar();

  mostrarHUD();

  actualizarDisparos();
  actualizarEnemigos();
  
  verificarTransiciones();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) nave.mover(-1);
  if (keyCode === RIGHT_ARROW) nave.mover(1);
  if (key === ' ') nave.disparar();
  if (key === 'Enter' && !jugando) {
    iniciarNivel();
    jugando = true;
  }
}

iniciarNivel();

guardarTopScore();
