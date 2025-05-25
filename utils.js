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
    text(`Puntaje: ${puntaje}`, 10, 20);
    text(`Vidas: ${vidas}`, 10, 40);
    text(`Nivel: ${nivel}`, 10, 60);
}

function actualizarDisparos() {
    for (let i = disparos.length - 1; i >= 0; i--) {
      disparos[i].mover();
      disparos[i].mostrar();
  
      if (disparos[i].fueraDePantalla()) {
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