class CircleObject extends BaseObject {
  constructor(x={}) {
    super(x);
    this.radius = x['r'] ? x['r'] : 0;
  }

  generateHTMLObject() {
    alert("TODO");
  }
}
