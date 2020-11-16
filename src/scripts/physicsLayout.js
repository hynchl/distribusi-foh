var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composites = Matter.Composites,
    Common = Matter.Common,
    Svg = Matter.Svg,
    Vertices = Matter.Vertices;
var engine = Engine.create();
var render = Render.create({
                element: document.body,
                engine: engine,
                options: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    wireframes: false,
                }
             });
              
var ceiling = Bodies.rectangle(window.innerWidth/2, 0, window.innerWidth, 60, { isStatic: true });
var floor = Bodies.rectangle(window.innerWidth/2, window.innerHeight-30, window.innerWidth, 60, { isStatic: true });
var leftWall = Bodies.rectangle(0, window.innerHeight/2, 60, window.innerHeight, { isStatic: true });
var rightWall = Bodies.rectangle(window.innerWidth, window.innerHeight/2, 60, window.innerHeight, { isStatic: true });

// Get SVG
var sampleSVG = document.getElementsByClassName("shape");
var vertexSets = [],
color = ['#556270'];

var frags = [];
for(let i = 0; i < sampleSVG.length; i++) {
    path = sampleSVG[i];
    var v = Bodies.fromVertices(100+(i*80), 80, Svg.pathToVertices(path, 20), {
      render: {
        fillStyle: color,
        strokeStyle: color
      }
    }, true);

    v.position.x *= 0.8;
    v.position.y *= 0.8;
    v.mass = 1;
    v.restitution = 0.3;
    v.name = path.parentNode.id
    // vertexSets.push(v);
    frags.push(v);
};

// vertexSets.push(ground)

console.log(engine.world);
engine.world.gravity = {scale: 0.0001, x: 0, y: -1}

World.add(engine.world, [ceiling, floor, leftWall, rightWall]);
World.add(engine.world, frags);
// World.add(engine.world, [boxA, ballA, ballB, ground]);

Engine.run(engine);
Render.run(render);

SCALAR = 1;
THRESHOLD = 0;

window.addEventListener("resize", ()=>{
  // TODO : complete resize function
  console.log(window.innerWidth);
  console.log(window.innerHeight);

  // var leftWall = Bodies.rectangle(0, window.innerHeight/2, 60, window.innerHeight);
  var rightWall = Bodies.rectangle(window.innerWidth, window.innerHeight/2, 60, window.innerHeight);

  rightWall.position.x = window.innerWidth;
})

setInterval(()=>{
  for(let i = 0; i < frags.length; i++) {
    frags[i].angle = 0; // lock rotation
    let el = document.getElementById(frags[i].name);
    // if((frags[i].velocity.x > THRESHOLD) && (frags[i].velocity.y > THRESHOLD)){
      let x = frags[i].bounds.min.x * SCALAR
      let y = frags[i].bounds.min.y * SCALAR
      el.setAttribute('transform', "translate("+x+","+y+")");
    // } 
  }
}, 15)
// document.querySelector("svg").remove();