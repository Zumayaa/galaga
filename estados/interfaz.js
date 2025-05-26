let imgTitulo;

function mostrarMenu() {
  background(10);
  
  imageMode(CENTER); 
  image(imgTitulo, width / 2, 100, 600, 200);
  
  noStroke();
  fill(255, 0, 0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("ENTER PARA JUGAR", width / 2, 500);
}
  
function perdiste() {
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("PERDISTE", width / 2, height / 2 - 50);
    textSize(20);
    text("ENTER para reiniciar", width / 2, height / 2 + 50);
}
  
function transicion() {
  background(0);

  fill(255,0,0);
  textAlign(CENTER, CENTER);
  textSize(28);
  text(`Cargando nivel 2...`, width / 2, height / 2 - 20);
  
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
    textSize(14);
    fill(0, 255, 255);
    textAlign(LEFT, TOP);
    text(`Puntuación: ${puntaje}`, 300, 30);
  
    for (let i = 0; i < nave.lives; i++) {
      rect(width - (i + 1) * 30 - 10, 10, 10, 10); // PONER IMAGEN
    }
}
  
function obtenerNumeroNivel() {
    switch (gameState) {
      case "nivel1": return 1;
      case "nivel2": return 2;
      case "nivel3": return 3;
      default: return 0;
    }
}
  