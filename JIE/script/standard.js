$(function(){
    /******设置中间content高度********/
    var header_h=$("#header").height();
    var footer_h=$("#footer").height()
    var content_h=$(document.body).height()-header_h-footer_h;


    $("#content").css("height",content_h+"px");


    /*****禁用ajax*****/
    $(document).bind("mobileinit", function() {
        //disable ajax nav
        $.mobile.ajaxEnabled=false
    });

    /******iscroll**********/
    myscroll= new IScroll('#content', {
        probeType: 3,
        mouseWheel: true
    });
});