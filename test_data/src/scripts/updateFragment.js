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

var ceiling = Bodies.rectangle(render.canvas.width/2, 0, render.canvas.width, 120, { isStatic: true, friction:0, restitution:0.5 });
var leftWall = Bodies.rectangle(0, window.innerHeight/2, 60, window.innerHeight, { isStatic: true, friction:0, restitution:0.5 });
var rightWall = Bodies.rectangle(render.canvas.width, window.innerHeight/2, 60, window.innerHeight, { isStatic: true, friction:0, restitution:0.5 }); //update
var title = Bodies.rectangle(render.canvas.width/2, 0, 300, 200, { isStatic: true, friction:0, restitution:0.5 });
var timeline = Bodies.rectangle(render.canvas.width-60, window.innerHeight-150, 150, 150, { isStatic: true, friction:0, restitution:0.5 });

engine.world.gravity = {scale: 0.0001, x: 0, y: 0}
World.add(engine.world, [ceiling, leftWall, rightWall, title, timeline]);
Engine.run(engine);
Render.run(render);

let _svg = document.getElementById('_frags'); // original shape 
let svg = document.getElementById('frags'); // display

// get current fragment information
var frag_requestURL = `${window.location.origin}/index.json`;
var frag_request = new XMLHttpRequest();
frag_request.open('GET', frag_requestURL);
frag_request.responseType = 'json';
frag_request.send();


const FIRST_LOADING_NUM = 20;

var fragments = null;
var frag_disp = [];
frag_request.onload = function() {
    // after loading fragments information
    fragments = frag_request.response;
    fragments = peelFragment(fragments); 
    let count = FIRST_LOADING_NUM-1;
    while(count>=0){
        addFrag();
        count -= 1;
    }
}

color = ['#556270'];

const addFrag = () => {
    try{
        let _frag = fragments.shift();
        let p = findElementByProperty(participants, 'path', `${_frag.artist}`)
        if (_frag.artist == "") return;
        let frag = document.querySelector(`._${p.fragId}`).cloneNode(true); // get fragments by artist
        frag.classList=[];
        frag.id= `_${_frag.index}`;
        frag.childNodes[0].setAttribute("href", `${window.location.origin}/${_frag.artist}/#${convertIndexToString(_frag.index)}`);
        
        let text = frag.children[0].children[frag.children[0].children.length - 1];
        text.innerHTML = `#${convertIndexToString(_frag.index)}`
        
        let shape = frag.children[0].children[0];
        
        svg.appendChild(frag);
        frag_disp.push(addFragToWorld(shape));
    } catch(e) {

    }
}
let initY= 0;
const addFragToWorld = (path) => {
    var v = Bodies.fromVertices(100, getScrollTop(), Svg.pathToVertices(path, 20), {
      render: {
        fillStyle: color,
        strokeStyle: color
      },
      position: {
        x: render.canvas.width/2 + (Math.random() - 0.5) * render.canvas.width*0.8 - 50,
        y: initY// + (Math.random()-0.3) * window.innerHeight*0.1 // ****
      },
      mass: 0.01,
      restitution: 0.5,
      friction:0,
      name: path.parentNode.parentNode.id
    }, true);
    initY += (window.innerWidth >= 960)?40:75;
    World.add(engine.world, v);
    let el = document.getElementById(path.parentNode.parentNode.id)
    el.setAttribute("visibility", "visible")
    return v;
}

let maxY = 0;
let scrollChanged = false;
setInterval(()=>{
    if (!scrollChanged) return;
    if(fragments.length <= 0) return;

    let count = 1;
    while(count>=0 && fragments.length > 0){
        addFrag()
        count -= 1;    
    }
    scrollChanged = false;
}, 30);


setInterval(()=>{
    // update fragment position
    for(let i = 0; i < frag_disp.length; i++) {
        frag_disp[i].angle = 0; // lock rotation
        // if((frag_disp[i].velocity.x > THRESHOLD) || (frag_disp[i].velocity.y > THRESHOLD)){
            let el = document.getElementById(`${frag_disp[i].name}`);
            let x = frag_disp[i].bounds.min.x * SCALAR
            let y = frag_disp[i].bounds.min.y * SCALAR
            el.setAttribute('transform', "translate("+x+","+y+")");
        // }
    }

    let bodies = engine.world.bodies.filter(body => body.label === "Body");
    maxY = bodies.sort((a, b) => (b.position.y - a.position.y))[0].position.y;
    // if (maxY > getDocumentHeight()) return;


    // expand the height
    render.canvas.height = Math.max(window.innerHeight, maxY);
    document.querySelector('#frags').style.height = render.canvas.height + 200;
    if(leftWall.position.y+window.innerHeight/2 <getDocumentHeight()){
        leftWall = Bodies.rectangle(0, leftWall.position.y + render.canvas.width, 60, window.innerHeight, { isStatic: true });
        rightWall = Bodies.rectangle(render.canvas.width, rightWall.position.y + window.innerHeight, 60, window.innerHeight, { isStatic: true }); //update
        World.add(engine.world, [leftWall, rightWall]);
    }
  }, 15)

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

let prev = window.screenTop;
window.addEventListener('scroll', () => {
    if((getScrollTop() - prev > 0) || (getDocumentHeight()-(window.innerHeight+5) <= getScrollTop)){
        scrollChanged = true;
    }
    prev = getScrollTop();
});

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