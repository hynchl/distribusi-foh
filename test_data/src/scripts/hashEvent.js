let target = window.location.hash.slice(1);
console.log(target)
console.log("~~~")
try {
    document.getElementById(target).classList.add("focus");
    window.scrollTo(window.screenTop-100,0)
    setTimeout(()=>{
        document.getElementById(target).classList.remove("focus")
    }, 1000)
}catch(e){

}

try {
    document.querySelector('.octet-stream').remove();
}catch(e){
}

window.addEventListener("hashchange", ()=>{
    let target = window.location.hash.slice(1);
    console.log(target)
    document.getElementById(target).classList.add("focus");
    setTimeout(()=>{
        document.getElementById(target).classList.remove("focus")
    }, 1000)
    // window.screenTop = window.screenTop-300;
    // window.scrollTo(window.screenTop-100,0)
});
