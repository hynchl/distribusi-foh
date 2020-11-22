const participants = [
    { "name":"109", "path":"109", "fragId":"_109"},
    { "name":"blblbg", "path":"blblbg", "fragId":"blblbg"},
    { "name":"MC.mama", "path":"Mc._mama", "fragId":"mcMama"},
    { "name":"구은정", "path":"Eunjeong_Gu", "fragId":"eunjeongGu"},
    { "name":"그레이스", "path":"Grace_Kim", "fragId":"graceKim"},
    { "name":"김현철", "path":"Hyunchul_Kim", "fragId":"hyunchul"},
    { "name":"이야기", "path":"yiyagi", "fragId":"yiyagi"},
    { "name":"하마무", "path":"Hamamu", "fragId":"hamamu"},
    { "name":"지로", "path":"Ueta_Jiro", "fragId":"uetaJiro"},
    { "name":"이치무라 미사코", "path":"Ichimura_Misako", "fragId":"ichimuraMisako"},
    { "name":"호시노 메구미", "path":"Megumi", "fragId":"megumi"},
    { "name":"유희", "path":"yuhee", "fragId":"yuhee"},
    { "name":"원정", "path":"Wonjung", "fragId":"wonjung"},
    { "name":"오로민경", "path":"Oro_Minkyung", "fragId":"oroMinkyung"},
    { "name":"신민", "path":"Min_Shin", "fragId":"minShin"},
    { "name":"안세원", "path":"sewon", "fragId":"sewon"},
    { "name":"노다예", "path":"Dah_Yee_Noh", "fragId":"dahYeeNoh"},
    { "name":"무밍", "path":"mooming", "fragId":"mooming"},
    { "name":"양승욱", "path":"Seungwook_Yang", "fragId":"seungwookYang"},
    { "name":"배인숙", "path":"Insook_Bae", "fragId":"insookBae"},
    { "name":"빈곤사회연대", "path":"Korean_Peoples_Solidarity_Against_Poverty", "fragId":"kpsap"},
    { "name":"신재", "path":"Jae Shin", "fragId":"jaeShin"},
    { "name":"돌고래", "path":"", "fragId":"hyunjin"},
    { "name":"이두호", "path":"doohoyi", "fragId":"doohoyi"},
    { "name":"송수연", "path":"Song_Soo", "fragId":"songSoo"},
    { "name":"노들야학", "path":"nodl", "fragId":"nodl"},
    { "name":"현진", "path":"Hyunjin", "fragId":"hyunjin"},
    { "name":"정진호", "path":"Jinho_Jeong", "fragId":"jinhoJeong"},
    { "name":"홍서연", "path":"Hong_Seo_Yeon", "fragId":"hongSeoYeon"},
    { "name":"", "path":"", "fragId":"pzzz"},

    { "name":"포도", "path":"grape", "fragId":"hyunchul"},
    { "name":"무화과", "path":"fig", "fragId":"doohoyi"},
    { "name":"워크샵", "path":"event_workshop", "fragId":"sewon"},
    { "name":"강연", "path":"event_lecture", "fragId":"wonjung"},
    { "name":"자료", "path":"src", "fragId":"dahYeeNoh"},
    { "name":"당근", "path":"carrot", "fragId":"hyunchul"},
]


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

engine.world.gravity = {scale: 0.0001, x: 0, y: 0}
World.add(engine.world, [ceiling, floor, leftWall, rightWall, title, timeline]);
Engine.run(engine);
Render.run(render);

let _svg = document.getElementById('_frags');
let svg = document.getElementById('frags');



var frag_requestURL = `${window.location.origin}/index.json`;
var frag_request = new XMLHttpRequest();
frag_request.open('GET', frag_requestURL);
frag_request.responseType = 'json';
frag_request.send();

var fragments = null;
frag_request.onload = function() {
    fragments = frag_request.response;
    fragments = peelFragment(fragments);

    //
    for(let i = 0; i < fragments.length; i++){
        let p = findElementByProperty(participants, 'path', `${fragments[i].artist}`)
        if (fragments[i].artist == "") continue;
        
        let item = document.createElement("a");
        item.setAttribute("href", `/${fragments[i].artist}/#${convertIndexToString(fragments[i].index)}`);
        svg.appendChild(item);

        let frag = document.querySelector(`._${p.fragId}`).cloneNode(true);
        frag.classList=[];
        frag.classList.add(p.fragId);
        item.appendChild(frag);
        // 1. children에서 shape를 찾아야함
        // 2. 
        // console.log(frag.childNodes)
        console.log($(`.${p.fragId}`).children('.shape'));
        
        // svg.appendChild(frag);

        // todo 
        }
        document.getElementById('fragments_wrapper').appendChild(svg.cloneNode(true));

}

const addFragToWorld = (frag) => {
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
}

let peelFragment = (arr) => {
    let frags = []
    for(var i = arr.length-1; i >=0; i--) frags.push(arr[i]['__Fragment__']);
    return frags;
}

const convertIndexToString = (index) => {
    return ('0'.repeat(4-index.toString().length))+index.toString();
}

let findElementByProperty = (arr, key, value) => {
    for(var i = 0, len = arr.length; i < len; i++)
        if (arr[i][key] === value) return arr[i];
    return -1;
}