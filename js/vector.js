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
}
