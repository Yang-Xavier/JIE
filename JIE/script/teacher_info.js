var mainscroll;
var showscroll;
var showPhone=false;

$(function(){
    /******设置中间content高度********/
    var header_h=$("#header").height();
    var footer_h=$("#footer").height()
    var content_h=$(document.body).height()-header_h-footer_h;
    $("#content").css("height",content_h-1+"px");
    /************iscroll main**************/
    mainscroll= new IScroll('#content', {
        probeType: 3,
        mouseWheel: true
    });
    /************iscroll show********************/
    $("#show_img").css("width",$("#show_img").children().length*220+"px");
    showscroll=new IScroll('#show',{
        eventPassthrough: true,
        scrollX: true,
        scrollY: false,
        preventDefault: false
    });
    $("#phone").click(function(){
        if(isUser())
            if(!showPhone){
                $("#teacher_phone").css("display","block");
                showPhone=true;
            }else{
                $("#teacher_phone").css("display","none");
                showPhone=false;
            }
    });
    $("#order").click(function(){
       location.href="order_teacher.html";
    });
});
$(document).bind("mobileinit", function() {
    //disable ajax nav
    $.mobile.ajaxEnabled=false
});
/********判断是游客还是用户***********/
function isUser(){
    return true;
}