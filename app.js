// VARIABLES DEL JUEGO
let nave;
let disparos = [];
let enemigos = [];
let nivel = 1;
let puntaje = 0;
let vidas = 3;
let jugando = false;
let topScores = [];

// CLASE NAVE
class Nave {
  constructor() {
    this.x = width / 2;
    this.y = height - 40;
    this.w = 40;
    this.h = 20;
  }

  mostrar() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.w, this.h);
  }

  mover(dir) {
    this.x += dir * 10;
    this.x = constrain(this.x, 0, width - this.w);
  }

  disparar() {
    disparos.push(new Disparo(this.x + this.w / 2, this.y));
  }
}

// CLASE DISPARO
class Disparo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 5;
  }

  mover() {
    this.y -= 5;
  }

  mostrar() {
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
  }

  fueraDePantalla() {
    return this.y < 0;
  }
}

// CLASE ENEMIGO
class Enemigo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 20;
  }

  mover() {
    this.y += 1;
  }

  mostrar() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
  }
}

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

  // Mostrar info
  fill(255);
  textSize(16);
  text(`Puntaje: ${puntaje}`, 70, 20);
  text(`Vidas: ${vidas}`, 60, 40);
  text(`Nivel: ${nivel}`, 60, 60);

  // Disparos
  for (let i = disparos.length - 1; i >= 0; i--) {
    disparos[i].mover();
    disparos[i].mostrar();

    if (disparos[i].fueraDePantalla()) {
      disparos.splice(i, 1);
      continue;
    }

    for (let j = enemigos.length - 1; j >= 0; j--) {
      if (
        disparos[i] &&
        colision(disparos[i], enemigos[j])
      ) {
        enemigos.splice(j, 1);
        disparos.splice(i, 1);
        puntaje++;
        break;
      }
    }
  }

  // Enemigos
  for (let i = enemigos.length - 1; i >= 0; i--) {
    enemigos[i].mover();
    enemigos[i].mostrar();

    if (enemigos[i].y + enemigos[i].h > height) {
      enemigos.splice(i, 1);
      vidas--;
    }

    if (colisionRect(nave, enemigos[i])) {
      enemigos.splice(i, 1);
      vidas--;
    }
  }

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

function colision(d, e) {
  return d.x > e.x && d.x < e.x + e.w && d.y < e.y + e.h;
}

function colisionRect(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
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
