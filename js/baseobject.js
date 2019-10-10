class BaseObject {
  constructor(x) {
    this.Area = null;
    this.HTMLObject = null;
    this.mass = 0;
    this.pos_x = 0;
    this.pos_y = 0;
    this.velocity = 0;
    this.vector = {x:0,y:0};
    console.log(x);
  }

  linkToHTMLArea(Area) {
    this.Area = Area;
  }

  generateHTMLObject() {
    throw "can't generate object for base class";
  }
}
