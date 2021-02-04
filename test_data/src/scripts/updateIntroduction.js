  if (getCookie('lang') ==='en') {
    showEnglish();
  } else {
    showKorean();
  }






let findElementByProperty = (arr, key, value) => {
    for(var i = 0, len = arr.length; i < len; i++)
        if (arr[i][key] === value) return arr[i];
    return -1;
}
  console.log(window.location);
  console.log(window.HashChangeEvent);
  console.log(window.location.hash);



  function setCookie(cookie_name, value, days) {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() +  days);

    var cookie_value = escape(value) + ((days == null)? '':'; expires=' + exdate.toUTCString());
    document.cookie = cookie_name + '=' + cookie_value;
  }

  function deleteCookie (cookie_name) {
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookie_name + "= " + "; expires=" + expireDate.toGMTString();
  }

  function getCookie(cookie_name) {
    let x, y;
    let val = document.cookie.split(';');

    for (let i = 0; i < val.length; i++) {
      x = val[i].substring(0, val[i].indexOf('='));
      y = val[i].substr(val[i].indexOf('=') + 1);
      x = x.replace(/^\s+|\s+$/g, '');
      if (x == cookie_name) {
        return unescape(y);
      }
    }
  }



  function showKorean(){
    console.log("kor")
    var introductions_requestURL = `${window.location.origin}/src/introduction.json`;
    var introductions_request = new XMLHttpRequest();
    introductions_request.open('GET', introductions_requestURL);
    introductions_request.responseType = 'json';
    introductions_request.send();
  
    // var introductions = null;
    introductions_request.onload = function() {
      let introductions = introductions_request.response;
      console.log(introductions)
      
      let path = (window.location.pathname).split('/')[1];
      let participant = findElementByProperty(introductions, 'path', path);
      document.getElementById("introduction").innerHTML = participant.introduction;
      
      let lang_button = document.createElement("img");
      lang_button.setAttribute("src", `/src/img/language_en.svg`)
      lang_button.setAttribute("style", "width:20px; vertical-align:text-top; cursor:pointer;")
      lang_button.onclick = showEnglish
      document.getElementById("introduction").appendChild(lang_button)

      let p_frag = document.createElement("img");
      p_frag.setAttribute("src", `/src/img/author_${participant.fragId}.svg`)
      
      let el = document.getElementById("fragment_wrapper");
      while(el.hasChildNodes()){
        el.removeChild(el.firstChild);
      }
      el.appendChild(p_frag);

    }
    // deleteCookie('lang');

  }

  function showEnglish(){
    console.log("en")
    var introductions_requestURL = `${window.location.origin}/src/introduction_en.json`;
    var introductions_request = new XMLHttpRequest();
    introductions_request.open('GET', introductions_requestURL);
    introductions_request.responseType = 'json';
    introductions_request.send();
  
    introductions_request.onload = function() {
      let introductions = introductions_request.response;
      console.log(introductions_request)
      
      let path = (window.location.pathname).split('/')[1];
      let participant = findElementByProperty(introductions, 'path', path);
      document.getElementById("introduction").innerHTML = participant.introduction;
      
      let lang_button = document.createElement("img");
      lang_button.setAttribute("src", `/src/img/language_kor.svg`)
      lang_button.setAttribute("style", "width:20px; vertical-align:text-top; cursor:pointer;")
      lang_button.onclick = showKorean
      document.getElementById("introduction").appendChild(lang_button)
      
      
      let p_frag = document.createElement("img");
      p_frag.setAttribute("src", `/src/img/author_${participant.fragId}.svg`)

      let el = document.getElementById("fragment_wrapper");
      while(el.hasChildNodes()){
        el.removeChild(el.firstChild);
      }
      el.appendChild(p_frag);
  
    }
    // deleteCookie('lang');
  }
