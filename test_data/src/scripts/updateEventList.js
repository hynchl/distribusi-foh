
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

    // convert date format( `.` -> `/` )
    let event = event_list[key];
    let date = event.date.split('.');
    date.pop();
    let date_str = date.join(' /');
    
    let row = document.createElement('div');
    row.classList.add("event_row")
    row.innerHTML = `${date_str} &emsp;&emsp; #${key} ${event.title}`
    let link = document.createElement('a');
    link.href = `${key}/`
    link.appendChild(row)
    
    document.getElementById("about_wrapper").appendChild(link);
    // TODO: add hover effect
    // TODO: add 
  }


}
