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
    this.oob = {n:0, s:0, w:0, e:0};
    this.reset_point = {x:this.pos_x, y:this.pos_y};
    this.grav = null; // every object can have individual grav, but if null -> use Area Grav
    this.friction = null; // every object can have individual friction, but if null -> use Area friction
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

  addVector(vAB) {
    this.vector.x += vAB.x;
    this.vector.y += vAB.y;
  }

  setVector(vAB) {
    this.vector.x = vAB.x;
    this.vector.y = vAB.y;
  }

  generateHTMLObject() {
    throw "can't generate object for base class";
  }

  reset() {
    this.pos_x = this.reset_point.x;
    this.pos_y = this.reset_point.y;
    this.oob = {n:0, s:0, w:0, e:0};
  }

  update() {
    throw "can't update base class";
  }

  //events
  eventCreate() {
    if (LOGGING) { console.log(this); }
  }
  eventUpdateStart() {
    if (LOGGING) { console.log(this); }
  }
  eventUpdateEnd() {
    if (LOGGING) { console.log(this); }
  }
  eventCollisionWall(site="UNKNOWN") {
    if (LOGGING) { console.log("wall: " + site); }
  }
  eventOOB(site="UNKNOWN") {
    if (LOGGING) { console.log("oob: " + site); }
  }
  eventCollisionObject(Obj) {
    if (LOGGING) { console.log(Obj); }
  }
}
