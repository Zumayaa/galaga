function iniciarNivel1() {
    nave = new Nave();
    enemigos = [];
    disparos = [];
    direccionEnemigo = 1;
  
    for (let i = 0; i < 10; i++) {
      enemigos.push(new Enemigo(i * 60 + 40, 100));
    }
}
  
function nivel1() {
    actualizarNivel1();
    nave.mostrar();
    dibujarHUD();
    actualizarDisparos();
  
}
  
function actualizarNivel1() {
    let cambiarDireccion = false;
  
    for (let enemy of enemigos) {
      if (enemy.x + enemy.w > width || enemy.x < 0) {
        cambiarDireccion = true;
        break;
    }
}
  
if (cambiarDireccion) {
    direccionEnemigo *= -1;
    for (let enemy of enemigos) {
        enemy.bajar();
    }
}
  
for (let i = enemigos.length - 1; i >= 0; i--) {
    const e = enemigos[i];
  
    if (e.y + e.h > height || e.chocar(nave)) {
        gameState = "perdiste";
        return;
    }
  
      e.update();
      e.show();
    }
  
    if (enemigos.length === 0) {
      siguienteNivel = "nivel2";
      tiempoTransicion = 120;
      gameState = "transicion";
    }
}
  