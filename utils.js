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

function mostrarHUD() {
    fill(255);
    textSize(16);
    text(`Puntaje: ${nave.score}`, 10, 20);
    text(`Vidas: ${nave.lives}`, 10, 40);
    text(`Nivel: ${nivel}`, 10, 60);
}

function actualizarDisparos() {
    for (let i = disparos.length - 1; i >= 0; i--) {
      disparos[i].mover();
      disparos[i].mostrar();
  
      if (disparos[i].desaparece()) {
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
}

function actualizarEnemigos(){
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
}

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

function verificarTransiciones(){
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