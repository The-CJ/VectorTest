class BaseObject {
  constructor(x={}) {
    this.Area = null;
    this.HTMLObject = null;
    this.bounce = x['bounce'] ? x['bounce'] : false;
    this.mass = x['m'] ? x['m'] : 0;
    this.pos_x = x['x'] ? x['x'] : 0;
    this.pos_y = x['y'] ? x['y'] : 0;
    this.velocity = x['v'] ? x['v'] : 0;
    this.vector = this.getVector(x["vector"]);
  }

  getVector(vec) {
    if (!vec) { return {x:0,y:0}; }
    if (typeof vec == "object") { return vec; }
    if (typeof vec == "string") {
      var vXY = vec.split(";");
      var x = vXY[0];
      var y = vXY[1];
      if (!x || !y) { throw "can't generate vector from string"; }
      return {"x":parseFloat(x), "y":parseFloat(y)}
    }

  }

  generateHTMLObject() {
    throw "can't generate object for base class";
  }
}
