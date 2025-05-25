class Enemigo {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.w = 30;
      this.h = 20;
    }
  
    mover() {
      this.y += 1;
    }
  
    mostrar() {
      fill(255, 0, 0);
      rect(this.x, this.y, this.w, this.h);
    }
  }
  