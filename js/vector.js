class Vector {
  constructor(x=0, y=0) {
    this.x = x;
    this.y = y;
  }

  add(vAB) {
    this.x += vAB.x;
    this.y += vAB.y;
  }

  set(vAB) {
    this.x = vAB.x;
    this.y = vAB.y;
  }

  mult(v) {
    this.x = this.x * v;
    this.y = this.y * v;
  }

  get velocity() {
    var vX = Math.abs(this.x);
    var vY = Math.abs(this.y);
    var speed = Math.sqrt( (Math.pow(vX, 2) + Math.pow(vY, 2)) );
    return speed;
  }
}
