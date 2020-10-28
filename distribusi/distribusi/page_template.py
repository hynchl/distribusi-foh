html_head = """
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Generated with distribusi https://git.vvvvvvaria.org/varia/distribusi -->
    <meta name="generator" content="distribusi" />
    <meta http-equiv="content-type" content="text/html; charset=utf-8"> 
    <style>
      .image{max-width: 100%%;}
      .pdf object{width:640px;height: 640px;}
      .dir::before{content:"📁 ";font-size:18px;}
      .filename{display:block;font-family:mono;}
      .unkown-file::before{content:"📄 ";font-size:18px;}
      div{max-width: 640px;display:inline-block;vertical-align:top;margin:1em;padding:1em;}
      video {width:640px;max-height:640px;}
      %s
    </style>
    <script language="JavaScript">
<!--
function autoResize(id){
    
    
    var newheight;
    var newwidth;

    if(document.getElementById){
        newheight=document.getElementById(id).contentWindow.document.body.scrollHeight;
        newwidth=document.getElementById(id).contentWindow.document.body.scrollWidth;
    }

    document.getElementById(id).height= (newheight) + "px";
    document.getElementById(id).width= (newwidth) + "px";
    
    console.log("Call autoResize for "+id+" w: " + newwidth + ", h: " + newheight);
    
    
}
//-->
</script>
  </head>
  <body>
"""

html_footer = """
  </body>
</html>
"""
