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