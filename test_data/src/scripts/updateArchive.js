
  var archive_requestURL = `${window.location.origin}/index.json`;
  var archive_request = new XMLHttpRequest();
  archive_request.open('GET', archive_requestURL);
  archive_request.responseType = 'json';
  archive_request.send();

  var fragments = null;
  archive_request.onload = function() {
    fragments = archive_request.response;
    
    let path = (window.location.pathname).split('/')[1];
    let p_frags = findFragments(fragments, 'artist', path);
    console.log(p_frags);


    for(let i = 0; i < p_frags.length; i++){
        let item = document.createElement("a");
        item.setAttribute("href", `#${convertIndexToString(p_frags[i].index)}`);
        item.innerHTML = (p_frags[i].file);
        document.getElementById("archive_list").appendChild(item)
    }

}

let findFragments = (arr, key, value) => {
    let frags = []
    for(var i = arr.length-1; i >=0; i--)
        if (arr[i]['__Fragment__'][key] === value)
            frags.push(arr[i]['__Fragment__']);
    return frags;
}

const convertIndexToString = (index) => {
    return ('0'.repeat(4-index.toString().length))+index.toString();
}