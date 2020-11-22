const SCALAR = 1;
const THRESHOLD = 0;
const INIT_DURATION = 300;
const INIT_RATIO = 0.9;
let maxY = 0;

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
              
var ceiling = Bodies.rectangle(render.canvas.width/2, 0, render.canvas.width, 120, { isStatic: true, friction:0, restitution:10});
var leftWall = Bodies.rectangle(0, window.innerHeight/2, 5, window.innerHeight, { isStatic: true, friction:0, restitution:10});
var rightWall = Bodies.rectangle(render.canvas.width, window.innerHeight/2, 5, window.innerHeight, { isStatic: true, friction:0, restitution:10}); //update
var floor = Bodies.rectangle(render.canvas.width/2, window.innerHeight, render.canvas.width, 240, { isStatic: true, friction:0, restitution:10});


// Get SVG
var sampleSVG = document.getElementsByClassName("shape");
var vertexSets = [],
color = ['#556270'];

var frags = [];
var initY = 0;
for(let i = 0; i < sampleSVG.length; i++) {
    path = sampleSVG[i];

    var v = Bodies.fromVertices(100+(i*80), 80, Svg.pathToVertices(path, 20), {
      render: {
        fillStyle: color,
        strokeStyle: color
      },
      position: {
        x: window.innerWidth/2 + (Math.random() - 0.5) * window.innerWidth*0.25,
        y: initY//window.innerHeight/2 + (Math.random() - 0.4) * window.innerHeight*0.5
      },
      mass: Math.random(),
      restitution: 0.5,
      friction:0,
      staticFriction:0,
      name: path.parentNode.id
    }, true);
    initY = (window.innerWidth>960)?initY+10:initY+75;
    console.log(initY);
    let el = document.getElementById(path.parentNode.id)
    el.setAttribute("visibility", "hidden")

    frags.push(v);
  };

  frags.sort((a,b)=>{return (a.position.y-b.position.y)})
  engine.world.gravity = {scale: 0.0001, x: 0, y: 0}
  World.add(engine.world, [ceiling, leftWall, rightWall]);
  if(render.canvas.width>860) World.add(engine.world, floor)
  Engine.run(engine);
  Render.run(render);


// window.addEventListener("resize", ()=>{
//   // TODO : complete resize function
//   // console.log(window.innerWidth);
//   // console.log(window.innerHeight);

//   // // var leftWall = Bodies.rectangle(0, window.innerHeight/2, 60, window.innerHeight);
//   var rightWall = Bodies.rectangle(window.innerWidth, window.innerHeight/2, 60, window.innerHeight);

//   rightWall.position.x = window.innerWidth;
// })

let count = 0, duration = 500//INIT_DURATION;
let addFrags = ()=>{
  if (count >= frags.length){
    return;
  }else{
    let el = document.getElementById(frags[count].name);
    el.setAttribute("visibility", "visible")
    World.add(engine.world, frags[count]);
    count += 1;
    duration *= INIT_RATIO;
    // addFrags();
    setTimeout(addFrags, 50);
  }
}
addFrags();

setInterval(()=>{
  for(let i = 0; i < frags.length; i++) {
    frags[i].angle = 0; // lock rotation
    let el = document.getElementById(frags[i].name);
    let x = frags[i].bounds.min.x * SCALAR
    let y = frags[i].bounds.min.y * SCALAR
    el.setAttribute('transform', "translate("+x+","+y+")");
  }

  let bodies = engine.world.bodies.filter(body => body.label === "Body");
  maxY = bodies.sort((a, b) => (b.position.y - a.position.y))[0].position.y;
  if (maxY > getDocumentHeight()) return;

  render.canvas.height = Math.max(window.innerHeight, maxY + 100);
  document.querySelector('#authors').style.height = render.canvas.height;
  
  if(leftWall.position.y+window.innerHeight/2 <getDocumentHeight()){
    leftWall = Bodies.rectangle(0, leftWall.position.y + render.canvas.width, 60, window.innerHeight, { isStatic: true });
    rightWall = Bodies.rectangle(render.canvas.width, rightWall.position.y + window.innerHeight, 60, window.innerHeight, { isStatic: true }); //update
    World.add(engine.world, [leftWall, rightWall]);
  }

}, 15)


// 현재 스크롤한 높이를 구하는 함수 
function getScrollTop() {
  return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}
// 문서의 높이를 구하는 함수
function getDocumentHeight() {
  const body = document.body;
  const html = document.documentElement;
  
  return Math.max(
      body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight
  );
}