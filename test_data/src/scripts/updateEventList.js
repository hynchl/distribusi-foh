
// event name
var pathname = window.location.pathname.split('/');

var ed_resquest = new XMLHttpRequest();
ed_resquest.open('GET', '/events/data.json');
ed_resquest.responseType = 'json';
ed_resquest.send();

var event_list = null;
ed_resquest.onload = function() {

  event_list = ed_resquest.response;

  console.log(event_list)
  for (let key in event_list){
    console.log(key);
    let event = event_list[key];
    let row = document.createElement('div');
    row.classList.add("event_row")
    row.innerHTML = `${event.date} #${event.number} ${event.title} : ${event.host}`
    let link = document.createElement('a');
    link.href = `${key}/`
    link.appendChild(row)
    
    document.getElementById("about_wrapper").appendChild(link);
    // TODO: add hover effect
    // TODO: add 
  }


}
