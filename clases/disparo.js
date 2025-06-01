class Disparo {
  constructor(x, y, speed = 10) {
    this.x = x;
    this.y = y;
    this.w = 5;
    this.h = 15; 
    this.speed = speed;
    this.alreadyHit = false;
    this.damage = 1; 
  }

  mover() {
    this.y -= this.speed;
  }

  mostrar() {
    fill(255, this.alreadyHit ? 100 : 255, 0); 
    rect(this.x, this.y, this.w, this.h);
  }

  colision(enemigo) {
    if (this.alreadyHit) return false; 
    
    const colisionando = (
      this.x < enemigo.x + enemigo.w &&
      this.x + this.w > enemigo.x &&
      this.y < enemigo.y + enemigo.h &&
      this.y + this.h > enemigo.y
    );

    if (colisionando) {
      this.alreadyHit = true;
      return true;
    }
    return false;
  }

  desaparece() {
    return this.y < 0 || this.alreadyHit;
  }
}