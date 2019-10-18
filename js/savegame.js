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
        return {color: r, t:key};
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
        new CircleObject({r:br, x:w/4, y:h/2, color:"white", snappable: true}),

        // stage 0
        new CircleObject({r:br, x:x, y:(h/2), ...randomProp(ball_variants)}),
        // stage 1
        new CircleObject({r:br, x:x+stage, y:(h/2+br), ...randomProp(ball_variants)}),
        new CircleObject({r:br, x:x+stage, y:(h/2-br), ...randomProp(ball_variants)}),
        // stage 2
        new CircleObject({r:br, x:x+stage*2, y:(h/2+br*2), ...randomProp(ball_variants)}),
        new CircleObject({r:br, x:x+stage*2, y:(h/2), ...randomProp(ball_variants)}),
        new CircleObject({r:br, x:x+stage*2, y:(h/2-br*2), ...randomProp(ball_variants)}),
        // stage 3
        new CircleObject({r:br, x:x+stage*3, y:(h/2-br*3), ...randomProp(ball_variants)}),
        new CircleObject({r:br, x:x+stage*3, y:(h/2-br), ...randomProp(ball_variants)}),
        new CircleObject({r:br, x:x+stage*3, y:(h/2+br), ...randomProp(ball_variants)}),
        new CircleObject({r:br, x:x+stage*3, y:(h/2+br*3), ...randomProp(ball_variants)}),
        // stage 3
        new CircleObject({r:br, x:x+stage*4, y:(h/2+br*4), ...randomProp(ball_variants)}),
        new CircleObject({r:br, x:x+stage*4, y:(h/2+br*2), ...randomProp(ball_variants)}),
        new CircleObject({r:br, x:x+stage*4, y:(h/2), ...randomProp(ball_variants)}),
        new CircleObject({r:br, x:x+stage*4, y:(h/2-br*2), ...randomProp(ball_variants)}),
        new CircleObject({r:br, x:x+stage*4, y:(h/2-br*4), ...randomProp(ball_variants)}),
      ]
    };
  }

}
