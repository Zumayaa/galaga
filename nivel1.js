function iniciarNivel1() {
    nave = new Nave();
    enemigos = [];
    disparos = [];
    direccionEnemigo = 1;
  
    for (let i = 0; i < 10; i++) {
      enemigos.push(new Enemigo(i * 60 + 40, 100, 3 , enemieImg));
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
  
    for (let enemigo of enemigos) {
      if (enemigo.x + enemigo.w > width || enemigo.x < 0) {
        cambiarDireccion = true;
        break;
    }
}
  
if (cambiarDireccion) {
    direccionEnemigo *= -1;
    for (let enemigo of enemigos) {
      enemigo.bajar();
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
  