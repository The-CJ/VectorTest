class PlayArea {
  constructor(x={}) {
    this.area_id = x["area_id"] ? x["area_id"] : "main_area";
    this.HTMLObject = document.getElementById(this.area_id);
    if (!this.HTMLObject) { throw "can't find #"+this.area_id; }

    this.objects = x["objects"] ? x["objects"] : [];
  }

  generateObject(n) {
    var Obj = Utils.getElementByName(n);
    if (!Obj) { throw "can't find object: "+n; }
    Obj = new Obj();
    return this.addObject(Obj);
  }

  addObject(Obj) {
    this.objects.push(Obj);
    return true;
  }
}
