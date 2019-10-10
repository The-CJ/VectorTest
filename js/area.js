class PlayArea {
  constructor(x={}) {
    this.area_id = x["area_id"] ? x["area_id"] : "main_area";
    this.HTMLObject = document.getElementById(this.area_id);
    if (!this.HTMLObject) { throw "can't find #"+this.area_id; }

    this.objects = x["objects"] ? x["objects"] : [];
    this.update_delay = x["update_delay"] ? x["update_delay"] : 100;
    this.smooth = x["smooth"] ? x["smooth"] : false;
    this.running = false;

  }

  generateObject(name, values={}) {
    var Obj = Utils.getObjectByName(name);
    Obj = new Obj(values);
    return this.addObject(Obj);
  }

  addObject(Obj) {
    // link to a area and add to this are
    Obj.Area = this;
    this.objects.push(Obj);
    Obj.generateHTMLObject();
    return true;
  }

  start() {
    if (this.running) { throw "already runing"; }
    this.running = true;
    this.run();
  }

  stop() {
    this.running = false;
  }

  async run() {
    while (this.running) {
      for (var Obj of this.objects) {
        Obj.update();
      }

      await sleep(this.update_delay);
    }
  }

}
