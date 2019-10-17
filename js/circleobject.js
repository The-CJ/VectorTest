class CircleObject extends BaseObject {
  constructor(x={}) {
    super(x);
    this.radius = x['r'] ? parseInt(x['r']) : 1;
    this.mass = this.mass ? this.mass : this.radius * 1.5;
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

    // wall collision | west
    if ( (this.pos_x-this.radius) <= 0) {
      this.pos_x = this.radius; // a radius between center and wall
      if (this.vector.x > 0) {
        // means we hit the wall, BUT we are moving away from it, means we are in it
        this.oob.w++;
        if (this.oob.w >= 5) { this.reset(); }
        this.eventOOB("west");
      }
      this.eventCollisionWall("west");
      this.vector.x = (this.vector.x * -1);
    }

    // wall collision | east
    if ( (this.pos_x+this.radius) >= this.Area.HTMLObject.offsetWidth) {
      this.pos_x = this.Area.HTMLObject.offsetWidth - this.radius; // a radius between center and wall
      if (this.vector.x < 0) {
        // means we hit the wall, BUT we are moving away from it, means we are in it
        this.oob.e++;
        if (this.oob.e >= 5) { this.reset(); }
        this.eventOOB("east");
      }
      this.eventCollisionWall("east");
      this.vector.x = (this.vector.x * -1);
    }

    // wall collision | north
    if ( (this.pos_y-this.radius) <= 0) {
      this.pos_y = this.radius; // a radius between center and wall
      if (this.vector.y > 0) {
        // means we hit the wall, BUT we are moving away from it, means we are in it
        this.oob.n++;
        if (this.oob.n >= 5) { this.reset(); }
        this.eventOOB("north");
      }
      this.eventCollisionWall("north");
      this.vector.y = (this.vector.y * -1);
    }

    // wall collision | south
    if ( (this.pos_y+this.radius) >= this.Area.HTMLObject.offsetHeight) {
      this.pos_y = this.Area.HTMLObject.offsetHeight - this.radius; // a radius between center and wall
      if (this.vector.y < 0) {
        // means we hit the wall, BUT we are moving away from it, means we are in it
        this.oob.s++;
        if (this.oob.s >= 5) { this.reset(); }
        this.eventOOB("south");
      }
      this.eventCollisionWall("south");
      this.vector.y = (this.vector.y * -1);
    }

    // test collision with other objects
    for (var Ob of this.Area.objects) {
      if (Ob === this) { continue; } // ignore self
      var collide = this.testCollision(Ob);
      if (collide != false) {
        this.eventCollisionObject(Ob, collide);

        // before checking collision vector changes we need to set balls in save positions
        var overlap = 0.5 * ( collide.hyp - this.radius - Ob.radius );
        this.pos_x -= overlap * (this.pos_x - Ob.pos_x) / collide.hyp;
        this.pos_y -= overlap * (this.pos_y - Ob.pos_y) / collide.hyp;

        Ob.pos_y += overlap * (this.pos_y - Ob.pos_y) / collide.hyp;
        Ob.pos_y += overlap * (this.pos_y - Ob.pos_y) / collide.hyp;

        // pushed back? good now physics
        // get normalized vectors and generate tangent as well
        var nx = (Ob.pos_x - this.pos_x) / collide.hyp;
        var ny = (Ob.pos_y - this.pos_y) / collide.hyp;

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
    this.HTMLObject.style.backgroundColor = this.color;
    this.HTMLObject.style.width = (this.radius * 2)+"px";
    this.HTMLObject.style.height = (this.radius * 2)+"px";
    this.HTMLObject.style.left = (this.pos_x - this.radius)+"px";
    this.HTMLObject.style.top = (this.pos_y - this.radius)+"px";

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

  testCollision(Obj) {
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
}
