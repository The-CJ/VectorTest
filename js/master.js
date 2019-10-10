var INIT_PLAY_AREA = null;
document.addEventListener("DOMContentLoaded", function(event) {
  INIT_PLAY_AREA = new PlayArea({"area_id":"main_area"});
});

var Utils = new (class {
  constructor() {

  }
  getObjectByName(name) {
    if (name == "circle") { return CircleObject; }
    // if (name == "rectangle") { return CircleObject; }
    throw "can't find object: "+name;
  }

})()
