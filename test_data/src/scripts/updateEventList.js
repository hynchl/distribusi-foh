
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

  Object.entries(event_list)

    .sort(function(a, b) {
      return a[1].number < b[1].number
    })

    .forEach(function(item) {
      console.log(item);

      //
      let key = item[0];
      let event = item[1];

      // convert date format( `.` -> `/` )
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
    })


}
