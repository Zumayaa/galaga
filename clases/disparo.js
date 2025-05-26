class Disparo {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.r = 5;
    }
  
    mover() {
      this.y -= 5;
    }
  
    mostrar() {
      fill(255);
      ellipse(this.x, this.y, this.r * 2);
    }
  
    desaparece() {
      return this.y < 0;
    }
  }