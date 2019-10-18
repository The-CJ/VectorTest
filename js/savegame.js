class SaveGame {
  constructor() {
    this.last = null;
  }

  get(name) {
    if (name == "pool") {
      return this.loadPool();
    }
  }

  // presets
  loadPool() {
    var br = 20;
    var w = INIT_PLAY_AREA.HTMLObject.offsetWidth;
    var h = INIT_PLAY_AREA.HTMLObject.offsetHeight;

    var x = (w/5*3);
    var stage = Math.sqrt( Math.pow((br*2),2) - Math.pow(br,2) );
    var randomProp = function (obj) {
        var keys = Object.keys(obj)
        var key = keys[ keys.length * Math.random() << 0];
        var r = obj[key];
        delete obj[key];
        return r;
    };
    var ball_variants = {
      "1": "yellow",
      "2": "blue",
      "3": "red",
      "4": "purple",
      "5": "orange",
      "6": "green",
      "7": "maroon",
      "8": "black",
      "9": "yellow",
      "10": "blue",
      "11": "red",
      "12": "purple",
      "13": "orange",
      "14": "green",
      "15": "maroon",
    };

    return {
      "update_delay": 10,
      "smooth": false,
      "grav": new Vector(0, 0),
      "friction": 0.999,
      "objects": [
        new CircleObject({r:br, x:w/4, y:h/2, color:"white"}),

        // stage 0
        new CircleObject({r:br, x:x, y:(h/2), t:'9', color:"yellow"}),
        // stage 1
        new CircleObject({r:br, x:x+stage, y:(h/2+br), t:'7', color:"maroon"}),
        new CircleObject({r:br, x:x+stage, y:(h/2-br), t:'12', color:"purple"}),
        // stage 2
        new CircleObject({r:br, x:x+stage*2, y:(h/2+br*2), t:'1', color:"yellow"}),
        new CircleObject({r:br, x:x+stage*2, y:(h/2), t:'8', color:"black"}),
        new CircleObject({r:br, x:x+stage*2, y:(h/2-br*2), t:'15', color:"maroon"}),
        // stage 3
        new CircleObject({r:br, x:x+stage*3, y:(h/2-br*3), t:'6', color:"green"}),
        new CircleObject({r:br, x:x+stage*3, y:(h/2-br), t:'10', color:"blue"}),
        new CircleObject({r:br, x:x+stage*3, y:(h/2+br), t:'3', color:"red"}),
        new CircleObject({r:br, x:x+stage*3, y:(h/2+br*3), t:'14', color:"green"}),
        // stage 3
        new CircleObject({r:br, x:x+stage*4, y:(h/2+br*4), t:'5', color:"orange"}),
        new CircleObject({r:br, x:x+stage*4, y:(h/2+br*2), t:'4', color:"purple"}),
        new CircleObject({r:br, x:x+stage*4, y:(h/2), t:'13', color:"orange"}),
        new CircleObject({r:br, x:x+stage*4, y:(h/2-br*2), t:'2', color:"blue"}),
        new CircleObject({r:br, x:x+stage*4, y:(h/2-br*4), t:'11', color:"red"}),
      ]
    };
  }

}
