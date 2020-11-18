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
    {   "name":"무밍", "path":"mooming", "fragId":"mooming"},
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

    let _svg = document.getElementById('_frags');
    let svg = document.getElementById('frags');

  var frag_requestURL = `${window.location.origin}/index.json`;
  var frag_request = new XMLHttpRequest();
  frag_request.open('GET', frag_requestURL);
  frag_request.responseType = 'json';
  frag_request.send();

  var fragments = null;
  frag_request.onload = function() {
    fragments = frag_request.response;
    fragments = peelFragment(fragments);

    for(let i = 0; i < fragments.length; i++){
        let p = findElementByProperty(participants, 'path', fragments[i].artist)
        if (fragments[i].artist == "") continue;
        
        let item = document.createElement("a");
        item.setAttribute("href", `${fragments[i].artist}/#${convertIndexToString(fragments[i].index)}`);
        svg.appendChild(item);

        let frag = document.querySelector(`.${p.fragId}`).cloneNode(true);
        item.appendChild(frag);

        // todo 

    }

}

// 최초 30개 , 스크롤 속도에 비례해서 추가적으로 조각 생겨나도록!
// 다 만들었으면 깜빡 효과 주고




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