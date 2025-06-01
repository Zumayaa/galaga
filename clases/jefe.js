class Jefe extends Enemigo {
  constructor(x, y, speed = 3, img = null) {
    super(x, y, speed, img);
    this.lives = 15;
    this.maxLives = 15;
    this.color = color(255, 0, 0);
    this.direccion = 1;
    this.w = 120;
    this.h = 100;
    this.speed = speed;
    this.invulnerable = false;
    this.hitTimer = 0;
  }

  update() {
    this.x += this.speed * this.direccion * (1 + sin(frameCount * 0.05) * 0.3);
    
    if (this.x + this.w > width || this.x < 0) {
      this.direccion *= -1;
      this.x = constrain(this.x, 0, width - this.w);
      this.speed += 0.2;
    }
    
    if (this.invulnerable) {
      this.hitTimer++;
      if (this.hitTimer > 30) {
        this.invulnerable = false;
        this.hitTimer = 0;
      }
    }
  }

  show() {
    noStroke();
    fill(50);
    rect(this.x - 5, this.y - 25, this.w + 10, 15, 5);
    fill(255, 0, 0);
    rect(this.x, this.y - 20, this.w, 5);
    fill(0, 255, 0);
    rect(this.x, this.y - 20, this.w * (this.lives / this.maxLives), 5);
    
    if (!this.invulnerable || frameCount % 10 < 5) {
      if (this.img) {
        image(this.img, this.x, this.y, this.w, this.h);
      } else {
        fill(this.color);
        rect(this.x, this.y, this.w, this.h);
      }
    }
    
    fill(255);
    textSize(12);
    text(`${this.lives}/${this.maxLives}`, this.x + this.w/2 - 20, this.y - 10);
  }

  hit() {
    if (this.invulnerable) return false;
    
    this.lives--;
    this.invulnerable = true;
    
    this.color = color(255, 100, 100);
    setTimeout(() => this.color = color(255, 0, 0), 100);
    
    return this.lives <= 0;
  }
}