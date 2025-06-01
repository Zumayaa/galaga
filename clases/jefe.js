class Jefe extends Enemigo {
  constructor(x, y, speed = 3, img = null) {
    super(x, y, speed, img);
    this.maxLives = 15;
    this.lives = this.maxLives; 
    this.color = color(255, 0, 0);
    this.direccion = 1;
    this.w = 120;
    this.h = 100;
    this.speed = speed;
    this.invulnerable = false;
    this.hitCooldown = 0;
    this.hitCooldownMax = 30; 
    this.lastHitFrame = 0;
  }

  update() {
    this.x += this.speed * this.direccion;
    
    if (this.x + this.w > width || this.x < 0) {
      this.direccion *= -1;
      this.x = constrain(this.x, 0, width - this.w);
    }
    
    if (this.invulnerable) {
      this.hitCooldown++;
      if (this.hitCooldown >= this.hitCooldownMax) {
        this.invulnerable = false;
        this.hitCooldown = 0;
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
    
    if (!this.invulnerable || frameCount % 8 < 4) {
      if (this.img) {
        image(this.img, this.x, this.y, this.w, this.h);
      } else {
        fill(this.color);
        rect(this.x, this.y, this.w, this.h);
      }
    }
    
    fill(255);
    textSize(12);
    textAlign(CENTER);
    text(`${this.lives}/${this.maxLives}`, this.x + this.w/2, this.y - 10);
  }

  hit(damage = 1) {
    let currentTime = millis();
    
    if (this.invulnerable || (currentTime - this.lastHitTime) < this.hitDelay) {
      return false;
    }
    
    this.lives -= damage; 
    this.lastHitTime = currentTime;
    
    if (this.lives > 0) {
      this.invulnerable = true;
      this.hitCooldown = 0;
      this.color = color(255, 100, 100);
      setTimeout(() => { this.color = color(255, 0, 0); }, 100);
    }
    
    return this.lives <= 0;
  }
}