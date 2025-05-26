let imgTitulo;

function preload() {
  imgTitulo = loadImage('images/title.png'); 
}

function mostrarMenu() {
  background(10);
  
  imageMode(CENTER); 
  image(imgTitulo, width / 2, 100, 600, 200);
  
  noStroke();
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("ENTER para jugar", width / 2, 250);
}
  
function mostrarVictoria() {
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Felicidades, has ganado", width / 2, height / 2 - 50);
    textSize(20);
    text("Ingresa tu nombre y presiona ENTER", width / 2, height / 2 + 50);
    // HAY Q AÑADIR EL INPUT CAWN
}
  
function perdiste() {
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2 - 50);
    textSize(20);
    text("Presiona ENTER para reiniciar", width / 2, height / 2 + 50);
}
  
function transicion() {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(28);
    text(`¡Pasaste al siguiente nivel!`, width / 2, height / 2 - 20);
    text(`Te quedan ${vidas} vidas`, width / 2, height / 2 + 20);
  
    tiempoTransicion--;
  
    if (tiempoTransicion <= 0) {
      gameState = siguienteNivel;
    }
}
  
function dibujarHUD() {
    textSize(14);
    fill(0, 255, 255);
    textAlign(LEFT, TOP);
    text(`Nivel: ${obtenerNumeroNivel()}`, 10, 10);
    text(`Score: ${puntaje}`, 10, 30);
  
    for (let i = 0; i < vidas; i++) {
      rect(width - (i + 1) * 30 - 10, 10, 20, 20); // o imagen de vida
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
  