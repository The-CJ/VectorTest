class CircleObject extends BaseObject {
  constructor(x={}) {
    super(x);
    this.radius = x['r'] ? parseInt(x['r']) : 1;
    this.mass = this.mass ? this.mass : (Math.PI * (this.radius**2));
  }

  generateHTMLObject() {
    // generate from phantom and stick to this.HTMLObject
    this.HTMLObject = document.querySelector("[phantom-models] > .object.circle").cloneNode(true);
    this.Area.HTMLObject.appendChild(this.HTMLObject);
    this.eventCreate();
    this.update();
  }

  update() {
    this.eventUpdateStart();
    // make it smooth
    if (this.Area.smooth) {
      this.HTMLObject.style.transitionProperty = "top,left";
      this.HTMLObject.style.transitionTimingFunction = "linear";
      this.HTMLObject.style.transitionDuration = this.Area.update_delay + "ms";
    }

    // move object to next pos based on vector
    this.pos_x = this.pos_x + this.vector.x;
    this.pos_y = this.pos_y + this.vector.y;

    this.wallCheck();

    // test collision with other objects
    for (var Ob of this.Area.objects) {
      if (Ob === this) { continue; } // ignore self
      var collide = false;

      // circle
      if (Ob instanceof CircleObject) {
        collide = this.testCollisionWithCircleObject(Ob);
        if (collide != false) {
          this.eventCollisionObject(Ob, collide);
          this.calcCollisionWithCircleObject(Ob, collide);
        }
      }
    }

    // max velocity changes
    if (Math.abs(this.vector.x) > this.max_vector) {
      if (this.vector.x > 0) { this.vector.x = this.max_vector; }
      else { this.vector.x = -this.max_vector; }
    }
    if (Math.abs(this.vector.y) > this.max_vector) {
      if (this.vector.y > 0) { this.vector.y = this.max_vector; }
      else { this.vector.y = -this.max_vector; }
    }

    // updating display
    this.HTMLObject.style.borderColor = this.border;
    this.HTMLObject.style.backgroundColor = this.color;
    this.HTMLObject.style.width = (this.radius * 2)+"px";
    this.HTMLObject.style.height = (this.radius * 2)+"px";
    this.HTMLObject.style.left = (this.pos_x - this.radius)+"px";
    this.HTMLObject.style.top = (this.pos_y - this.radius)+"px";
    var thisO = this;
    if (this.draggable) {
      this.HTMLObject.onmousedown = function () {thisO.dragStart()};
    }
    if (this.snappable) {
      this.HTMLObject.ondblclick = function () {thisO.snapStart()};
    }

    // after all movement is complete, set vectors based on grav and friction for next iteration
    var G = this.grav ? this.grav : this.Area.grav;
    var f = this.friction ? this.friction : this.Area.friction;

    // G
    this.vector.x += G.x;
    this.vector.y += G.y;

    // f
    this.vector.x *= f;
    this.vector.y *= f;

    this.eventUpdateEnd();
  }

  wallCheck() {
    // wall collision | west
    if ( (this.pos_x-this.radius) <= 0) {
      this.pos_x = this.radius; // a radius between center and wall
      this.eventCollisionWall("west");
      this.vector.x = (this.vector.x * -1);
    }

    // wall collision | east
    if ( (this.pos_x+this.radius) >= this.Area.HTMLObject.offsetWidth) {
      this.pos_x = this.Area.HTMLObject.offsetWidth - this.radius; // a radius between center and wall
      this.eventCollisionWall("east");
      this.vector.x = (this.vector.x * -1);
    }

    // wall collision | north
    if ( (this.pos_y-this.radius) <= 0) {
      this.pos_y = this.radius; // a radius between center and wall
      this.eventCollisionWall("north");
      this.vector.y = (this.vector.y * -1);
    }

    // wall collision | south
    if ( (this.pos_y+this.radius) >= this.Area.HTMLObject.offsetHeight) {
      this.pos_y = this.Area.HTMLObject.offsetHeight - this.radius; // a radius between center and wall
      this.eventCollisionWall("south");
      this.vector.y = (this.vector.y * -1);
    }
  }

  testCollisionWithCircleObject(Obj) {
    var a = Math.abs( this.pos_y - Obj.pos_y );
    var b = Math.abs( this.pos_x - Obj.pos_x );
    var hyp = Math.sqrt( (Math.pow(a, 2) + Math.pow(b, 2)) );
    // hyp is the distance between both inner points, if this distance is smaller than both radius, they collide
    if (hyp < (this.radius + Obj.radius)) {
      return {"hyp":hyp};
    } else {
      return false;
    }
  }

  calcCollisionWithCircleObject(Ob, collide_info) {
    // before checking collision vector changes we need to set balls in save positions
    var overlap = 0.5 * ( collide_info.hyp - this.radius - Ob.radius );
    this.pos_x -= overlap * (this.pos_x - Ob.pos_x) / collide_info.hyp;
    this.pos_y -= overlap * (this.pos_y - Ob.pos_y) / collide_info.hyp;

    Ob.pos_y += overlap * (this.pos_y - Ob.pos_y) / collide_info.hyp;
    Ob.pos_y += overlap * (this.pos_y - Ob.pos_y) / collide_info.hyp;

    // after replacement, hyp = the sum of both radius
    collide_info.hyp = Ob.radius + this.radius;

    // pushed back? good now physics
    // get normalized vectors and generate tangent as well
    var nx = (Ob.pos_x - this.pos_x) / collide_info.hyp;
    var ny = (Ob.pos_y - this.pos_y) / collide_info.hyp;

    var normalVector = new Vector(nx, ny);
    var tangentVector = new Vector(-ny, nx);

    // get scalar dot product from tangent
    var dpTanThis = this.vector.x * tangentVector.x + this.vector.y * tangentVector.y;
    var dpTanOb = Ob.vector.x * tangentVector.x + Ob.vector.y * tangentVector.y;

    // get scalar dot product from normal
    var dpNormThis = this.vector.x * normalVector.x + this.vector.y * normalVector.y;
    var dpNormOb = Ob.vector.x * normalVector.x + Ob.vector.y * normalVector.y;

    // get scalar convertion of momentum
    var comThis = ( dpNormThis * (this.mass - Ob.mass) + 2 * Ob.mass * dpNormOb ) / (this.mass + Ob.mass);
    var comOb = ( dpNormOb * (Ob.mass - this.mass) + 2 * this.mass * dpNormThis ) / (this.mass + Ob.mass);

    // set new vector based by tangent times dot product + the normal speed convertion
    this.vector.x = (tangentVector.x * dpTanThis) + (normalVector.x * comThis);
    this.vector.y = (tangentVector.y * dpTanThis) + (normalVector.y * comThis);
    // same but for other part
    Ob.vector.x = (tangentVector.x * dpTanOb) + (normalVector.x * comOb);
    Ob.vector.y = (tangentVector.y * dpTanOb) + (normalVector.y * comOb);
  }

  // drag
  dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    var thisO = this;
    document.onmouseup = function () { thisO.dragStop(); }
    document.onmousemove = function () { thisO.dragMove(); }
  }

  dragMove(e) {
    e = e || window.event;
    e.preventDefault();
    this.vector = new Vector();
    this.pos_x = e.clientX - ((window.innerWidth - this.Area.HTMLObject.offsetWidth) / 2);
    this.pos_y = e.clientY - ((window.innerHeight - this.Area.HTMLObject.offsetHeight) / 2);
  }

  dragStop() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  // snap
  snapStart(e) {
    e = e || window.event;
    e.preventDefault();
    var thisO = this;
    document.onmouseup = function () { thisO.snapCalc(); }
    this.border = "red";
  }

  snapCalc(e) {
    e = e || window.event;
    e.preventDefault();
    var cX = e.clientX - ((window.innerWidth - this.Area.HTMLObject.offsetWidth) / 2);
    var cY = e.clientY - ((window.innerHeight - this.Area.HTMLObject.offsetHeight) / 2);

    var Impus = new Vector( (cX-this.pos_x), (cY-this.pos_y) );
    Impus.mult(-0.25);
    this.vector.add(Impus);

    document.onmouseup = null;
    document.onmousemove = null;
    this.border = this.color;
  }

}
