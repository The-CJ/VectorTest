class CircleObject extends BaseObject {
  constructor(x={}) {
    super(x);
    this.radius = x['r'] ? parseInt(x['r']) : 1;
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
}
