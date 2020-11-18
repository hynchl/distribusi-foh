var requestURL = 'http://localhost:8000/introduction.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

var introductions = null
request.onload = function() {
  introductions = request.response;
  
  // IMAGE
  // NAME
  // 
  document.getElementById("introduction").innerHTML = introductions[20].introduction;
}


console.log(window.location)
console.log(window.HashChangeEvent)
console.log(window.location.hash)
