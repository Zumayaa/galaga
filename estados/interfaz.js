let imgTitulo;

function mostrarMenu() {
  background(10);
  
  imageMode(CENTER); 
  image(imgTitulo, width / 2, 200, 600, 200);
  
  noStroke();
  fill(255, 255, 255);
  textFont('Courier New'); 
  textSize(20);
  textAlign(CENTER, CENTER);
  text("ENTER PARA JUGAR", width / 2, 500);
}

function mostrarVictoria() {
    background(0, 0, 0, 200);
    fill(0, 255, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("¡VICTORIA!", width / 2, height / 2 - 100);
    
    fill(255);
    textSize(24);
    text(`Felicidades ${playerName}`, width / 2, height / 2 - 50);
    text(`Puntaje: ${puntaje}`, width / 2, height / 2);
    
    fill(150, 255, 150);
    textSize(18);
    text("Presiona ENTER para volver al menú", width / 2, height / 2 + 100);

    guardarTopScore();
}
  
function mostrarDerrota() {
    background(0, 0, 0, 200);
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2 - 100);
    
    fill(255);
    textSize(24);
    text(`${playerName}`, width / 2, height / 2 - 50);
    text(`Puntaje: ${puntaje}`, width / 2, height / 2);
    
    fill(255, 150, 150);
    textSize(18);
    text("Presiona ENTER para reintentar", width / 2, height / 2 + 100);

    guardarTopScore();
}

function mostrarTopScores() {
    if (scores.length === 0) return;
    
    let startY = (gameState === "menu") ? 400 : height / 2 + 150;
    
    fill(255, 255, 0);
    textSize(24);
    textAlign(CENTER);
    text("MEJORES PUNTAJES", width / 2, startY - 30);
    
    textSize(18);
    for (let i = 0; i < min(scores.length, 5); i++) {
        fill(255);
        text(`${i + 1}. ${scores[i].name}`, width / 2 - 80, startY + i * 30);
        fill(255, 255, 0);
        text(`${scores[i].score}`, width / 2 + 80, startY + i * 30);
    }
}
  
function transicion() {
  background(0);

  fill(255, 255, 255);
  textAlign(CENTER, CENTER);
  textFont('Courier New'); 
  textSize(28);
  text(`Cargando nivel...`, width / 2, height / 2 - 20);
  
  tiempoTransicion--;
  
  if (tiempoTransicion <= 0) {
    if (siguienteNivel === "nivel2") {
      iniciarNivel2(); 
    } else if (siguienteNivel === "nivel3") {
      iniciarNivel3(); 
    }

    gameState = siguienteNivel;
  }
}
  
function dibujarHUD() {
  fill(0, 0, 0, 150); 
  noStroke();
  rect(0, 0, width, 50);

  textFont('Courier New'); 
  textSize(16);
  fill(0, 255, 255); 
  textAlign(LEFT, CENTER);
  text(`VIDAS:`, 20, 25);

  for (let i = 0; i < nave.lives; i++) {
    fill(255, 0, 0); 
    rect(90 + i * 20, 18, 12, 12, 3);
  }

  textAlign(CENTER, CENTER);
  fill(255, 255, 0); 
  text(`PUNTAJE: ${puntaje}`, width / 2, 25);

  textAlign(RIGHT, CENTER);
  fill(255);
  text(`NIVEL: ${nivelActual}`, width - 20, 25);
}

  
function obtenerNumeroNivel() {
    switch (gameState) {
      case "nivel1": return 1;
      case "nivel2": return 2;
      case "nivel3": return 3;
      default: return 0;
    }
}
  