const SCALAR = 1;
const THRESHOLD = 0;
const INIT_DURATION = 300;
const INIT_RATIO = 0.9;

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
var floor = Bodies.rectangle(window.innerWidth/2, window.innerHeight-100, window.innerWidth, 60, { isStatic: true });
var leftWall = Bodies.rectangle(0, window.innerHeight/2, 60, window.innerHeight, { isStatic: true });
var rightWall = Bodies.rectangle(window.innerWidth, window.innerHeight/2, 60, window.innerHeight, { isStatic: true });
var title = Bodies.rectangle(window.innerWidth/2, 0, 300, 200, { isStatic: true });
var timeline = Bodies.rectangle(window.innerWidth-60, window.innerHeight-150, 150, 150, { isStatic: true });

// Get SVG
var sampleSVG = document.getElementsByClassName("shape");
var vertexSets = [],
color = ['#556270'];

var frags = [];
for(let i = 0; i < sampleSVG.length; i++) {
    path = sampleSVG[i];
    console.log(path);
    var v = Bodies.fromVertices(100+(i*80), 80, Svg.pathToVertices(path, 20), {
      render: {
        fillStyle: color,
        strokeStyle: color
      },
      position: {
        x: window.innerWidth/2 + (Math.random() - 0.5) * window.innerWidth*0.8,
        y: window.innerHeight/3 + (Math.random() - 0.5) * window.innerHeight*0.3
      },
      mass: 0.01,
      restitution: 0.5,
      name: path.parentNode.id
    }, true);

    let el = document.getElementById(path.parentNode.id)
    el.setAttribute("visibility", "hidden")

    frags.push(v);
};

// vertexSets.push(ground)

console.log(engine.world);
engine.world.gravity = {scale: 0.0001, x: 0, y: 0}

World.add(engine.world, [ceiling, floor, leftWall, rightWall, title, timeline]);
// World.add(engine.world, frags);

Engine.run(engine);
Render.run(render);


window.addEventListener("resize", ()=>{
  // TODO : complete resize function
  // console.log(window.innerWidth);
  // console.log(window.innerHeight);

  // // var leftWall = Bodies.rectangle(0, window.innerHeight/2, 60, window.innerHeight);
  var rightWall = Bodies.rectangle(window.innerWidth, window.innerHeight/2, 60, window.innerHeight);

  rightWall.position.x = window.innerWidth;
})

let count = 0;
let duration = INIT_DURATION;
let addFrags = ()=>{
  if (count >= frags.length){
    return;
  }else{
    let el = document.getElementById(frags[count].name);
    el.setAttribute("visibility", "visible")
    World.add(engine.world, frags[count]);
    count += 1;
    duration *= INIT_RATIO;
    setTimeout(addFrags, duration)
  }
}
addFrags();

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