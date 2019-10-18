class RactangleObject extends BaseObject {
  constructor(x={}) {
    super(x);
    this.a = x['a'] ? parseInt(x['a']) : 1;
    this.b = x['b'] ? parseInt(x['b']) : 1;
    this.mass = this.mass ? this.mass : (this.a * this.b);
  }

  generateHTMLObject() {
    // generate from phantom and stick to this.HTMLObject
    this.HTMLObject = document.querySelector("[phantom-models] > .object.ractangle").cloneNode(true);
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

    // updating display
    console.log(this);
    this.HTMLObject.style.borderColor = this.border;
    this.HTMLObject.style.backgroundColor = this.color;
    this.HTMLObject.style.width = (this.a)+"px";
    this.HTMLObject.style.height = (this.b)+"px";
    this.HTMLObject.style.left = (this.pos_x - this.a/2)+"px";
    this.HTMLObject.style.top = (this.pos_y - this.b/2)+"px";
    var thisO = this;
    if (this.draggable) {
      this.HTMLObject.onmousedown = function () {thisO.dragStart()};
    }
    if (this.snappable) {
      this.HTMLObject.ondblclick = function () {thisO.snapStart()};
    }
  }

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
