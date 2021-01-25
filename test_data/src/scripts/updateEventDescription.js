
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
}
