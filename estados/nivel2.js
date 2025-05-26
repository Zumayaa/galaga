class Tanque extends Enemigo {

    constructor(x, y, speed = 3, img = null) {
      super(x, y, speed, img);
      this.lives = 3;
      this.color = color(255, 0, 0);
    }
  
    show() {
        image(this.img, this.x, this.y, this.w, this.h); 
    }
  
    hit() {
      this.lives--;
      if (this.lives <= 0) {
        return true;
      }
      return false;
    }
}
  
class movelon extends Enemigo {
    constructor(x, y, speed = 5, img = null) {
      super(x, y, speed, img);
      this.moveTimer = 0;
      this.moveInterval = random(30, 80);
      this.xDirection = random([-1, 1]);
      this.yDirection = random([-1, 1]) * random(1, 2);
      this.color = color(255, 0, 0);
    }
  
    update() {
      this.x += this.xDirection * this.speed;
      this.y += this.yDirection;
      this.y += 0.5;
  
      this.moveTimer++;
      if (this.moveTimer > this.moveInterval) {
        this.xDirection = random([-1, 1]);
        this.yDirection = random([-1, 1]) * random(1, 2);
        this.moveTimer = 0;
        this.moveInterval = random(30, 80);
      }
  
      if (this.x + this.w > width || this.x < 0) {
        this.xDirection *= -1;
        this.x = constrain(this.x, 0, width - this.w);
      }
  
      if (this.y + this.h > height || this.y < 0) {
        this.yDirection *= -1;
        this.y = constrain(this.y, 0, height - this.h);
      }
    }
  
    show() {
        image(this.img, this.x, this.y, this.w, this.h);
    }
}
  
class balaEnemigo {
    constructor(x, y, speed = 10) {
      this.x = x;
      this.y = y;
      this.r = 3;
      this.speed = speed;
    }
  
    mover() {
      this.y += this.speed;
    }
  
    dibujar() {
      fill(255, 0, 0);
      ellipse(this.x, this.y, this.r * 2);
    }
  
    mostrar() {
      this.dibujar(); 
    }
  
    colision(nave) {
        let d = dist(this.x, this.y, nave.x + nave.w / 2, nave.y + nave.h / 2);
        return d < this.r + nave.w / 2 && d < this.r + nave.h / 2;
    }
}
  
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
  
    // Iteramos sobre los enemigos de atrás hacia adelante
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
  
      // Lógica de disparo enemigo
      let shootProb = 0.025;
      if (enemigoActual instanceof Tanque) {
        shootProb = 0.04;
      }
      if (random(1) < shootProb) {
        balasEnemigas.push(new balaEnemigo(enemigoActual.x + enemigoActual.w / 2, enemigoActual.y + enemigoActual.h));
      }
  
      // Lógica de colisiones de balas del jugador con enemigos
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

    enemigos.push(new movelon(50, 100, 9, movelonImg));
    enemigos.push(new movelon(width - 100, 150, 9, movelonImg));
    enemigos.push(new movelon(width / 2 - 50, 200, 9, movelonImg));
    enemigos.push(new movelon(150, 250, 9, movelonImg));
    enemigos.push(new movelon(width - 200, 300, 9, movelonImg));
    enemigos.push(new movelon(20, 200, 9, movelonImg));
    enemigos.push(new movelon(width - 70, 220, 9, movelonImg));

    enemigos.push(new Tanque(width / 2, 30, 3, tanqueIMG));

    balasEnemigas = [];
}