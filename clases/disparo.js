class Disparo {
  constructor(x, y, speed = 10) {
    this.x = x;
    this.y = y;
    this.w = 5;
    this.h = 10;
    this.speed = speed;
  }

  mover() {
    this.y -= this.speed;
  }

  mostrar() {
    fill(255, 255, 0);
    rect(this.x, this.y, this.w, this.h);
  }

  colision(enemigo) {
    return (
      this.x < enemigo.x + enemigo.w &&
      this.x + this.w > enemigo.x &&
      this.y < enemigo.y + enemigo.h &&
      this.y + this.h > enemigo.y
    );
  }

  desaparece() {
    return this.y < 0;
  }
}
  