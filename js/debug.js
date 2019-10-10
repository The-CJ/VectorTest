function showDebug() {
  var x = document.getElementById('debug_console');
  x.style.display = "block";
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
