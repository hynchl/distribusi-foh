let showingList = false;

function switchList() {
  if (showingList === true){
    document.querySelector('#archive_exit').style.display = "none";
    document.querySelector('#archive_list').style.display = "none";
    showingList = false;
  }else {
    document.querySelector('#archive_exit').style.display = "block";
    document.querySelector('#archive_list').style.display = "block";
    showingList = true;
  }
}

document.querySelector('#archive_exit').onclick = () => {
  if (window.innerWidth < 780){
    document.querySelector('#archive_exit').style.display = "none";
    document.querySelector('#archive_list').style.display = "none";
    showingList = false;
  }
}

document.querySelector('#archive_button').onclick = () => {
  if (window.innerWidth < 780){
    switchList();
  }
}

$('#archive').hover = () => {
  if (window.innerWidth < 780){
    switchList();
  }
}

document.querySelector("body").onresize = ()=>{
  if (window.innerWidth > 780) {
    document.querySelector('#archive_exit').style.display = "none";
    document.querySelector('#archive_list').style.display = "";
  }
};
