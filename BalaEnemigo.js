class BalaEnemigo {
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