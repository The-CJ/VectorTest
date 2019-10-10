class BaseObject {
  constructor(x={}) {
    this.Area = null;
    this.HTMLObject = null;
    this.bounce = x['bounce'] ? x['bounce'] : false;
    this.mass = x['m'] ? parseInt(x['m']) : 0;
    this.pos_x = x['x'] ? parseInt(x['x']) : 0;
    this.pos_y = x['y'] ? parseInt(x['y']) : 0;
    this.color = x["color"] ? x["color"] : "green";
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

  update() {
    throw "can't update base class";
  }

  //events
  eventCreate() {
    if (LOGGING) { console.log(this); }
  }
  eventUpdate() {
    if (LOGGING) { console.log(this); }
  }
  eventCollisionWall(site="UNKNOWN") {
    if (LOGGING) { console.log(site); }
  }
  eventCollisionObject(Obj) {
    if (LOGGING) { console.log(Obj); }
  }
}
