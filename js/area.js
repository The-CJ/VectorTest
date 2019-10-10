class MainArea {
  constructor(x={}) {
    this.area_id = x["area_id"] ? x["area_id"] : "main_area";
    this.HTMLObject = document.getElementById(this.area_id);
    if (!this.HTMLObject) { throw "cant find #"+this.area_id; }

    this.objects = x["objects"] ? x["objects"] : [];
  }

  addObject(Obj) {
    this.objects.push(Obj);
  }
}
