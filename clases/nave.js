class Nave {
  constructor() {
    this.x = width / 2;
    this.y = height - 40;
    this.w = 40;
    this.h = 20;
    this.lives = 3;
    this.score = 0; 
  }

  mostrar() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.w, this.h);
  }

  mover(dir) {
    this.x += dir * 10;
    this.x = constrain(this.x, 0, width - this.w);
  }

  disparar() {
    disparos.push(new Disparo(this.x + this.w / 2, this.y));
  }
}
