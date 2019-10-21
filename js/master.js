var Area = document.getElementById('main_area');
var Engine = Matter.Engine.create();
var Render = Matter.Render.create({
  element: Area,
  engine: Engine,
  options: {
    height: Area.offsetHeight,
    width: Area.offsetWidth,
    background: 'transparent',
    wireframes: false,
    pixelRatio: window.devicePixelRatio
  }
});

var Anchor = Matter.Bodies.circle(300,10, 5, {isStatic: true});

var Box1 = Matter.Bodies.rectangle(350,275,50,50);
var Box2 = Matter.Bodies.rectangle(250,275,50,50);
var Floor = Matter.Bodies.rectangle(250,550,500,10, {isStatic: true});

Matter.World.add(Engine.world, [Floor, Box1, Box2, Anchor]);
Matter.Engine.run(Engine);
Matter.Render.run(Render);
