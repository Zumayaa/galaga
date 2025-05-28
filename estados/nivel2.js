function actualizarNivel2() {
    let cambiarDireccionGrupo = false;
    for (let enemigo of enemigos) {
      if (!(enemigo instanceof movelon) && (enemigo.x + enemigo.w > width || enemigo.x < 0)) {
        cambiarDireccionGrupo = true;
        break;
      }
    }
  
    if (cambiarDireccionGrupo) {
      direccionEnemigo *= -1;
      for (let enemigo of enemigos) {
        if (!(enemigo instanceof movelon)) {
            enemigo.bajar();
        }
      }
    }
  
    for (let i = enemigos.length - 1; i >= 0; i--) {
      let enemigoActual = enemigos[i];
      enemigoActual.update();
      enemigoActual.show();
  
      if (enemigoActual.y + enemigoActual.h > height) {
        gameState = "perdiste";
        return; 
      }
      if (enemigoActual.chocar(nave)) {
        gameState = "perdiste";
        return; 
      }
  
      // disparo enemigo
      let disparoProba = 0.025;
      if (enemigoActual instanceof Tanque) {
        disparoProba = 0.04;
      }
      if (random(1) < disparoProba) {
        balasEnemigas.push(new balaEnemigo(enemigoActual.x + enemigoActual.w / 2, enemigoActual.y + enemigoActual.h));
      }
  
      // colision bala jugador enemigo
      for (let j = disparos.length - 1; j >= 0; j--) {
        if (disparos[j].colision(enemigoActual)) {
          nave.score += 1;
  
          if (enemigoActual instanceof Tanque) {
            if (enemigoActual.hit()) {
              nave.score += 3;
  
              enemigos.splice(i, 1);
              enemigoDestruido = true;
            }
          } else {
            enemigos.splice(i, 1);
            enemigoDestruido = true;
          }
  
          disparos.splice(j, 1);
          break;
        }
      }
      if (enemigos.length === 0) {
        siguienteNivel = "nivel3";
        tiempoTransicion = 120;
        gameState = "transicion";
      }
    }
}
  
function nivel2() {
  
    actualizarNivel2();
  
    nave.mostrar();
    dibujarHUD();
    actualizarDisparos();
  
    for (let i = disparos.length - 1; i >= 0; i--) {
      disparos[i].mover();
      disparos[i].mostrar();
      if (disparos[i] && disparos[i].desaparece()) {
        disparos.splice(i, 1);
      }
    }
  
    for (let i = balasEnemigas.length - 1; i >= 0; i--) {
        balasEnemigas[i].mover();
        balasEnemigas[i].mostrar();
      if (balasEnemigas[i].colision(nave)) {
        nave.score -= 1;
        balasEnemigas.splice(i, 1);
        nave.lives--;
        if (nave.lives <= 0) {
          gameState = "perdiste";
        }
      }
    }
}
  
function iniciarNivel2() {
    enemigos = [];
    direccionEnemigo = 1;

    for (let i = 0; i < 3; i++) {
        enemigos.push(new Enemigo(100 + i * 100, 60, 5, enemieImg));
    }

    const movelonesConfig = [
        { x: 50, y: 100 },
        { x: width - 100, y: 150 },
        { x: width / 2 - 50, y: 200 },
        { x: 150, y: 250 },
        { x: width - 200, y: 300 },
        { x: 20, y: 200 },
        { x: width - 70, y: 220 },
    ];
    
    for (let cfg of movelonesConfig) {
        enemigos.push(new movelon(cfg.x, cfg.y, 9, movelonImg));
    }

    enemigos.push(new Tanque(width / 2, 30, 3, tanqueIMG));

    balasEnemigas = [];
}