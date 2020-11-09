var didScroll; // 스크롤시에 사용자가 스크롤했다는 것을 알림 
$(window).scroll(function(event){ didScroll = true; }); 

setInterval(function() { if (didScroll) { 
    hasScrolled(); 
    didScroll = false; } }, 250); 

function hasScrolled() { 
    
    console.log(window.innerWidth)
    if (window.innerWidth < 720){
        if (window.scrollY > 50) {
            $("#menu").css("padding-top","0px");
            $("#logo_wrapper").css("display","none");
        }else{
            console.log("show")
            $("#menu").css("padding-top","");
            $("#logo_wrapper").css("display","");
        }
    }else {
        $("#menu").css("padding-top","");
        $("#logo_wrapper").css("display","");
    }

}
