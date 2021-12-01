
// event name
var pathname = window.location.pathname.split('/');
var event_number = pathname[pathname.length-2];

var ed_resquest = new XMLHttpRequest();
ed_resquest.open('GET', '/events/data.json');
ed_resquest.responseType = 'json';
ed_resquest.send();

var ed = null;
ed_resquest.onload = function() {
  // console.log(ed_resquest.response)
  res = ed_resquest.response;
  ed = res[event_number];
  document.getElementById("event_date").innerHTML = ed.date;
  document.getElementById("event_title").innerHTML = `#${event_number} ${ed.title}`
  document.getElementById("event_details").innerHTML = ed.details;

  // 수어 주소가 있는 경우에는 이벤트 설명 아래 수어 링크를 생성합니다.
  if (ed.signlang) {
    let parent = document.getElementById("event_description");
    let div = document.createElement("div");
    div.setAttribute("id", "event_sl");
    parent.appendChild(div);

    let a = document.createElement("a");
    a.setAttribute("id", "wrapper_coc");
    a.setAttribute("href", ed.signlang);
    a.setAttribute("target", "_blank")
    div.appendChild(a);

    let img = document.createElement("img");
    img.setAttribute("id", "icon_coc");
    img.setAttribute("src", "/src/img/sl.png");
    img.setAttribute("alt", "수어 보기 버튼");
    img.style.width = '100px';
    a.appendChild(img);
    
    let span = document.createElement("div");
    span.style.textAlign = 'center';
    span.innerHTML = "수어 보기";
    a.appendChild(span);
  }

  // <a id="wrapper_coc" href="https://www.youtube.com/watch?v=mvl4PkUjdUM" target="_blank"><img id="icon_coc" src="/src/img/sl.png" alt="수어 보기 버튼"> 수어 보기</a>
  // document.getElementById("event_place").innerHTML = ed.place;
  // document.getElementById("event_host").innerHTML = ed.host;
  
}
