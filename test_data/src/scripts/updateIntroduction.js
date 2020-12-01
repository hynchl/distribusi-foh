
  var introductions_requestURL = `${window.location.origin}/src/introduction.json`;
  var introductions_request = new XMLHttpRequest();
  introductions_request.open('GET', introductions_requestURL);
  introductions_request.responseType = 'json';
  introductions_request.send();

  var introductions = null;
  introductions_request.onload = function() {
    introductions = introductions_request.response;
    
    let path = (window.location.pathname).split('/')[1];
    let participant = findElementByProperty(introductions, 'path', path);
    document.getElementById("introduction").innerHTML = participant.introduction;
    
    let p_frag = document.createElement("img");
    p_frag.setAttribute("src", `/src/img/author_${participant.fragId}.svg`)
    document.getElementById("fragment_wrapper").appendChild(p_frag)

}

let findElementByProperty = (arr, key, value) => {
    for(var i = 0, len = arr.length; i < len; i++)
        if (arr[i][key] === value) return arr[i];
    return -1;
}
  console.log(window.location);
  console.log(window.HashChangeEvent);
  console.log(window.location.hash);


