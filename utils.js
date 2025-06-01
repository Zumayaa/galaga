let topScores = [];
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

function actualizarScoreboard() {
    const scoresList = document.getElementById('scores-list');
    scoresList.innerHTML = '';
    
    const sortedScores = [...scores].sort((a, b) => b.score - a.score).slice(0, 5);
    
    sortedScores.forEach((score, index) => {
        const scoreItem = document.createElement('div');
        scoreItem.className = 'score-item';
        scoreItem.innerHTML = `
            <span class="score-name">${index + 1}. ${score.name}</span>
            <span class="score-points">${score.score} pts</span>
        `;
        scoresList.appendChild(scoreItem);
    });
}

function cargarTopScores() {
    const guardados = localStorage.getItem("galaga_scores");
    if (guardados) {
        scores = JSON.parse(guardados);
    } else {
        scores = [];
    }
    return scores;
}

function guardarTopScore() {
    scores.push({
        name: playerName,
        score: nave.score,
        date: new Date().toLocaleDateString()
    });
    
    scores.sort((a, b) => b.score - a.score);

    scores = scores.slice(0, 5);
    
    localStorage.setItem("galaga_scores", JSON.stringify(scores));
    actualizarScoreboard();
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

function resetGame() {
    nave = new Nave();
    disparos = [];
    enemigos = [];
    balasEnemigas = [];
    nivelActual = 1;
    puntaje = 0;
    vidas = 3;
    tiempoTransicion = 100;
    
    siguienteNivel = "";

    cargarTopScores();
    if (rolita.isPlaying()) {
        rolita.stop();
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
  
}

function verificarTransiciones() {
    if (enemigos.length === 0) {
        nivelActual++;
        if (nivelActual > 3) {
            guardarTopScore(); 
            gameState = "ganaste";
        } else {
            siguienteNivel = "nivel" + (nivelActual + 1);
            tiempoTransicion = 100;
            gameState = "transicion";
        }
    }
    
    if (vidas <= 0) {
        guardarTopScore(); 
        gameState = "perdiste";
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
    if (playerName && puntaje > 0) {
        scores.push({
            name: playerName,
            score: puntaje,
            date: new Date().toLocaleDateString()
        });
  
        scores.sort((a, b) => b.score - a.score);
        scores = scores.slice(0, 5);
        
        localStorage.setItem("galaga_scores", JSON.stringify(scores));
        actualizarScoreboard();
    }
}
  