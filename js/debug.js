function showDebug() {
  var x = document.getElementById('debug_console');
  x.style.display = "block";
}

function debugStop() {
  INIT_PLAY_AREA.stop();
}

function debugStart() {
  INIT_PLAY_AREA.start();
}

function hideDebug() {
  var x = document.getElementById('debug_console');
  x.style.display = "none";
}

function debugGenerate() {
  var ValueNode = document.getElementById('debug_generate');
  var values = Utils.extractNameValues(ValueNode);
  INIT_PLAY_AREA.generateObject(values["type"], values);
}

function debugGenerateRandom() {
  var r = {
    "a": Math.floor(Math.random() * 200),
    "b": Math.floor(Math.random() * 200),
    "m": Math.floor(Math.random() * 50),
    "r": Math.floor(Math.random() * 99) + 1,
    "type": "circle",
    "v": Math.floor(Math.random() * 15),
    "vector": {
      "x": Math.floor(Math.random() * 20)-10,
      "y": Math.floor(Math.random() * 20)-10
    },
    "x": Math.floor(Math.random() * 600),
    "y": Math.floor(Math.random() * 600)
  };
  INIT_PLAY_AREA.generateObject(r["type"], r);
}
