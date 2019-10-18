class PlayArea {
  constructor(x={}) {
    this.area_id = x["area_id"] ? x["area_id"] : "main_area";
    this.HTMLObject = document.getElementById(this.area_id);
    if (!this.HTMLObject) { throw "can't find #"+this.area_id; }

    this.objects = x["objects"] ? x["objects"] : [];
    this.update_delay = x["update_delay"] ? x["update_delay"] : 10;
    this.smooth = x["smooth"] ? x["smooth"] : false;
    this.grav = x["grav"] ? x["grav"] : new Vector();
    this.friction = x["friction"] ? x["friction"] : 1;
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
    if (this.running) { throw "already running"; }
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

  load(save_name) {

    // clear first
    this.objects = [];
    this.HTMLObject.innerHTML = "";

    var presets = new SaveGame().get(save_name);
    if (presets["update_delay"] !== undefined) { this.update_delay = presets["update_delay"]; }
    if (presets["smooth"] !== undefined) { this.smooth = presets["smooth"]; }
    if (presets["grav"] !== undefined) { this.grav = presets["grav"]; }
    if (presets["friction"] !== undefined) { this.friction = presets["friction"]; }
    if (presets["objects"] !== undefined) {
      for (var newOb of presets["objects"]) {
        this.addObject(newOb);
      }
     }
    console.log(presets);

  }

}
