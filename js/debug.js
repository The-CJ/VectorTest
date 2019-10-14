function showDebug() {
  var x = document.getElementById('debug_console');
  x.style.display = "block";
}

function hideDebug() {
  var x = document.getElementById('debug_console');
  x.style.display = "none";
}

// sim settings
function debugStop() {
  INIT_PLAY_AREA.stop();
}

function debugSmooth() {
  INIT_PLAY_AREA.smooth = INIT_PLAY_AREA.smooth ? false : true;
  if (!INIT_PLAY_AREA.smooth) {
    for (var Node of document.querySelectorAll(".object")) {
      Node.style.transition = false;
    }
  }
}

function debugLog() {
  LOGGING = LOGGING ? false : true;
}

function debugStart() {
  INIT_PLAY_AREA.start();
}

// generate
function debugGenerate() {
  var ValueNode = document.getElementById('debug_generate');
  var values = Utils.extractNameValues(ValueNode);
  INIT_PLAY_AREA.generateObject(values["type"], values);
}

function debugSimSettings() {
  var vals = Utils.extractNameValues( document.getElementById('debug_simulation'));
  INIT_PLAY_AREA.update_delay = parseInt(vals["t"]);
}

function debugGenerateRandom() {
  var vA = Math.floor(Math.random() * 20)-10;
  var vB = Math.floor(Math.random() * 20)-10;
  var r = {
    "a": Math.floor(Math.random() * 200),
    "b": Math.floor(Math.random() * 200),
    // "m": Math.floor(Math.random() * 50),
    "r": Math.floor(Math.random() * 99) + 1,
    "type": "circle",
    "v": Math.floor(Math.random() * 15),
    "vector": new Vector(vA, vB),
    "x": Math.floor(Math.random() * 600),
    "y": Math.floor(Math.random() * 600)
  };
  INIT_PLAY_AREA.generateObject(r["type"], r);
}

// physics
function debugGrav() {
  var ValueNode = document.getElementById('debug_phy');
  var values = Utils.extractNameValues(ValueNode);
  var GvAB = new BaseObject().getVector(values["G"]);
  INIT_PLAY_AREA.grav = GvAB;
}

function debugFriction() {
  var ValueNode = document.getElementById('debug_phy');
  var values = Utils.extractNameValues(ValueNode);
  INIT_PLAY_AREA.friction = parseFloat(values["f"]);
}

function debugAddVector() {
  var vals = Utils.extractNameValues( document.getElementById('debug_phy'));
  var vAB = new BaseObject().getVector(vals["addVector"]);
  for (var Obj of INIT_PLAY_AREA.objects) {
    Obj.addVector(vAB);
  }
}

function debugSetVector() {
  var vals = Utils.extractNameValues( document.getElementById('debug_phy'));
  var vAB = new BaseObject().getVector(vals["setVector"]);
  for (var Obj of INIT_PLAY_AREA.objects) {
    Obj.setVector(vAB);
  }
}
