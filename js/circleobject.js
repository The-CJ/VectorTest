class CircleObject extends BaseObject {
  constructor(x={}) {
    super(x);
    this.radius = x['r'] ? parseInt(x['r']) : 1;
  }

  generateHTMLObject() {
    // generate from phantom and stick to this.HTMLObject
    this.HTMLObject = document.querySelector("[phantom-models] > .object.circle").cloneNode(true);
    this.Area.HTMLObject.appendChild(this.HTMLObject);
    this.update();
  }

  update() {
    var m_x = this.Area.HTMLObject.offsetWidth / 2;
    var m_y = this.Area.HTMLObject.offsetHeight / 2;

    // updateing display
    this.HTMLObject.style.backgroundColor = this.color;
    this.HTMLObject.style.width = (this.radius * 2)+"px";
    this.HTMLObject.style.height = (this.radius * 2)+"px";
    // m_x & m_y is middle of area + pos (-500 -> 0 -> 500...) minus the radius, because we want the middle
    this.HTMLObject.style.left = ((m_x + this.pos_x) - this.radius)+"px";
    this.HTMLObject.style.top = ((m_y + this.pos_y) - this.radius)+"px";
  }
}
