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