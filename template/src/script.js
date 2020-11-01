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
                    width: 800,
                    height: 400,
                    wireframes: false,
                }
             });
              
var boxA = Bodies.rectangle(400, 200, 80, 80);
var ballA = Bodies.circle(380, 100, 40, 10);
var ballB = Bodies.circle(460, 10, 40, 10);
var ground = Bodies.rectangle(400, 380, 810, 60, { isStatic: true });


var sampleSVG = document.querySelector('#sample').getElementsByTagName('path');
var vertexSets = [],
color = ['#556270'];


for(let i = 0; i < sampleSVG.length; i++) {
    path = sampleSVG[i];
    console.log(path)
    var v = Bodies.fromVertices(100+(i*80), 80, Svg.pathToVertices(path, 20), {
      render: {
        fillStyle: color,
        strokeStyle: color
      }
    }, true);
  console.log(v)
  vertexSets.push(v);
  World.add(engine.world, v);
};
document.querySelector("svg").remove();

vertexSets.push(ground)

World.add(engine.world, [boxA, ballA, ballB, ground]);
 
Engine.run(engine);
Render.run(render);