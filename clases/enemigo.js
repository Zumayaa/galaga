class Enemigo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 20;
  }

  update() {
    this.x += direccionEnemigo * 2;
  }

  bajar() {
    this.y += 20;
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
  }

  colisionaConJugador(jugador) {
    return (
      this.x < jugador.x + jugador.w &&
      this.x + this.w > jugador.x &&
      this.y < jugador.y + jugador.h &&
      this.y + this.h > jugador.y
    );
  }
}
