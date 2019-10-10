var LOGGING = false;
var INIT_PLAY_AREA = null;
document.addEventListener("DOMContentLoaded", function(event) {
  INIT_PLAY_AREA = new PlayArea({"area_id":"main_area"});
  INIT_PLAY_AREA.start();
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var Utils = new (class {
  constructor() {

  }
  getObjectByName(name) {
    if (name == "circle") { return CircleObject; }
    // if (name == "rectangle") { return CircleObject; }
    throw "can't find object: "+name;
  }
  extractNameValues(HTMLNode) {
    var r = {};
    var l = HTMLNode.querySelectorAll("[name]");
    for (var ValueNode of l) {
      r[ ValueNode.getAttribute("name") ] = ValueNode.value;
    }
    return r;
  }

})()
