
function actualizarNivel3() {
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
      
      if (typeof enemigoActual.update === "function") {
        enemigoActual.update();
      } else if (typeof enemigoActual.mover === "function") {
        enemigoActual.mover();
      }

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
              if (enemigoActual instanceof Tanque) {
                  nave.score += 1;
                  if (enemigoActual.hit()) {
                      nave.score += 3;
                      enemigos.splice(i, 1);
                      enemigoDestruido = true;
                  }
              } 
              else if (enemigoActual instanceof Jefe) {
                  nave.score += 2; 
                  if (enemigoActual.hit()) {
                      nave.score += 10; 
                      enemigos.splice(i, 1);
                      enemigoDestruido = true;
                  }
              }
              else {
                  nave.score += 1;
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
  
function nivel3() {
  
    actualizarNivel3();
  
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
        //nave.lives--;
        if (nave.lives <= 0) {
          gameState = "perdiste";
        }
      }
    }
}
  
function iniciarNivel3() {
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

        { x: 100, y: 350 },
        { x: width / 2 + 80, y: 180 },
        { x: 280, y: 300 },
        { x: width - 250, y: 120 },
        { x: 200, y: 400 },
        { x: width - 180, y: 370 },
        { x: width / 2 - 100, y: 150 },
        { x: 80, y: 180 },
        { x: width - 130, y: 280 },
    ];
        
    for (let cfg of movelonesConfig) {
        enemigos.push(new movelon(cfg.x, cfg.y, 5, movelonImg));
    }

    enemigos.push(new Tanque(width / 2, 30, 3, tanqueIMG));

    enemigos.push(new Tanque(width / 2, 90, 5, tanqueIMG));

    enemigos.push(new Jefe(width / 2, 50, 5, boss));

    balasEnemigas = [];
}