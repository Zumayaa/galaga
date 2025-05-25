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

  if (enemigos.length === 0) {
    nivel++;
    if (nivel > 3) {
      guardarTopScore();
      alert("¡Ganaste el juego!");
      noLoop();
    } else {
      iniciarNivel();
    }
  }

  if (vidas <= 0) {
    guardarTopScore();
    alert("Juego terminado");
    noLoop();
  }
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

// FUNCIONES AUXILIARES
function iniciarNivel() {
  enemigos = [];
  disparos = [];

  if (nivel === 1) {
    for (let i = 0; i < 10; i++) {
      enemigos.push(new Enemigo(i * 35 + 20, 50));
    }
  }

  // Niveles 2 y 3 se agregan después
}

// TOP SCORES
function cargarTopScores() {
  let guardados = localStorage.getItem("galaga_scores");
  if (guardados) {
    topScores = JSON.parse(guardados);
  }
}

function guardarTopScore() {
  topScores.push(puntaje);
  topScores.sort((a, b) => b - a);
  topScores = topScores.slice(0, 5);
  localStorage.setItem("galaga_scores", JSON.stringify(topScores));
}

function mostrarTopScores() {
  background(0);
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text("Top 5 Puntajes", width / 2, 100);
  textSize(16);
  for (let i = 0; i < topScores.length; i++) {
    text(`${i + 1}. ${topScores[i]} pts`, width / 2, 140 + i * 30);
  }
  text("Presiona ENTER para comenzar", width / 5, 350);
}
