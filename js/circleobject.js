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
    var m_x = Math.floor(this.Area.HTMLObject.offsetWidth / 2);
    var m_y = Math.floor(this.Area.HTMLObject.offsetHeight / 2);

    // make it smooth
    this.HTMLObject.style.transitionProperty = "top,left";
    this.HTMLObject.style.transitionTimingFunction = "linear";
    this.HTMLObject.style.transitionDuration = this.Area.update_delay + "ms";

    // move object to next pos based on vector
    this.pos_x = this.pos_x + this.vector.x;
    this.pos_y = this.pos_y + this.vector.y;

    // wall collision
    if ( (m_x+this.pos_x-this.radius) <= 0) {
      // collsion with west site, negate X vector
      this.eventCollisionWall("west");
      this.vector.x = (this.vector.x * -1);
    }
    if (this.Area.HTMLObject.offsetWidth) {  }

    // updating display
    this.HTMLObject.style.backgroundColor = this.color;
    this.HTMLObject.style.width = (this.radius * 2)+"px";
    this.HTMLObject.style.height = (this.radius * 2)+"px";
    // m_x & m_y is middle of area + pos (-500 -> 0 -> 500...) minus the radius, because we want the middle
    this.HTMLObject.style.left = ((m_x + this.pos_x) - this.radius)+"px";
    this.HTMLObject.style.top = ((m_y + this.pos_y) - this.radius)+"px";
    this.eventUpdate();
  }
}
