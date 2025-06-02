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
    if (!scoresList) return;
    
    scoresList.innerHTML = '';
    
    scores.forEach((score, index) => {
        const scoreItem = document.createElement('div');
        scoreItem.className = 'score-item';
        scoreItem.innerHTML = `
            <span class="score-position">${index + 1}.</span>
            <span class="score-name">${score.name}</span>
            <span class="score-points">${score.score} pts</span>
            <span class="score-date">${score.date}</span>
        `;
        scoresList.appendChild(scoreItem);
    });
}

function cargarTopScores() {
    const guardados = localStorage.getItem("galaga_scores");
    if (guardados) {
        scores = JSON.parse(guardados);
    } else {
        scores = [
            { name: "Marcos", score: 10, date: new Date().toLocaleDateString() },
            { name: "Pancho", score: 9, date: new Date().toLocaleDateString() },
            { name: "Zumaya", score: 8, date: new Date().toLocaleDateString() },
            { name: "Canelita", score: 7, date: new Date().toLocaleDateString() },
            { name: "Nose", score: 6, date: new Date().toLocaleDateString() }
        ];
        localStorage.setItem("galaga_scores", JSON.stringify(scores));
    }
    actualizarScoreboard();
}

function guardarTopScore() {
    if (!playerName || puntaje <= 0) return;
    
    const existingPlayerIndex = scores.findIndex(s => s.name === playerName);
    
    if (existingPlayerIndex >= 0) {
        if (puntaje > scores[existingPlayerIndex].score) {
            scores[existingPlayerIndex].score = puntaje;
            scores[existingPlayerIndex].date = new Date().toLocaleDateString();
        }
    } else {
        scores.push({
            name: playerName,
            score: puntaje,
            date: new Date().toLocaleDateString()
        });
    }
    
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
    tiro.stop();
    enemigoTiro.stop();

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

    gameState = "menu";
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
    balasEnemigas = [];
    
    if (nivelActual === 1) {
        iniciarNivel1();
    } else if (nivelActual === 2) {
        iniciarNivel2();
    } else if (nivelActual === 3) {
        iniciarNivel3();
    }
}

javascript
function verificarTransiciones() {
    if (enemigos.length === 0) {
        if (nivelActual >= 3) {  
            guardarTopScore();
            gameState = "ganaste";
        } else {
            nivelActual++;
            siguienteNivel = "nivel" + nivelActual;
            tiempoTransicion = 100;
            gameState = "transicion";
        }
    }
    
    if (vidas <= 0 || nave.lives <= 0) {  
        guardarTopScore();
        gameState = "perdiste";
    }
}
  