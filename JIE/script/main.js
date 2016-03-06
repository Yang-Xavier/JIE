/*************************iScroll*************************/
var myscroll;
var right_scroll;
var adv_imgs=new Array();
var adv_li=new Array();

/*****禁用ajax*****/
$(document).bind("mobileinit", function() {
    //disable ajax nav
    $.mobile.ajaxEnabled=false
});

$(function(){
    /******设置中间content高度********/
    var header_h=$("#header").height();
    var footer_h=$("#footer").height()
    var content_h=$(document.body).height()-header_h-footer_h;

    $("#content").css("height",content_h+"px");

    /*************cover***************/
    $("#cover").css("top",header_h+"px");
    $("#cover").css("height",content_h+"px");

    /***************设置右边菜单*****************/
    $("#right_content").css("top",header_h+"px");
    $("#right_content").css("height",content_h+"px");

    /******iscroll**********/
    myscroll= new IScroll('#content', {
        probeType: 3,
        mouseWheel: true
    });
    right_scroll=new IScroll('#right_content',{
        probeType: 3,
        mouseWheel: true
    })
    /********iscroll实现下拉刷新******/
    var y;
    myscroll.on("scroll",function(){
        y=this.y;
        var refresh=$("#down_refresh");
        if(y>=80){
            refresh.html("松开刷新").css("text-align","center");
            location.reload();
            return "";
        }else if(y<80&&y>20){
            refresh.html("用力下拉刷新").css("text-align","center");
                    var t=setTimeout(function(){
                        $("#down_refresh").html("");
                    },500);
            return "";
        }
    });
    /***********加载更多按钮事件**************/
    $("#cli_more").click(function(){
        addmore();
        myscroll.refresh();
    });
    /**************右边菜单******************/
    var more=true;
    $('#more').click(function(){
        if(more){
            $('#right_content').animate({left:'60%'});
            $('#left_content').animate({left:'-40%'});
            $('#cover').animate({opacity: '0.3'});
            $('#cover').css("display","block");
            more=!more;
        }else{
            $('#right_content').animate({left:'140%'});
            $('#left_content').animate({left:'0%'});
            $('#cover').animate({opacity: '0'});
            $('#cover').css("display","none");
            more=!more;
        }
    })
    $('#cover').click(function(){
        $('#right_content').animate({left:'140%'});
        $('#left_content').animate({left:'0%'});
        $('#cover').animate({opacity: '0'});
        $('#cover').css("display","none");
        more=!more;
    });


});

/**************广告滚动*******************/
/********************************************************************/
$(document).on("pagecreate","#pageone",function(){
    adv_li[0]=$("#al3");
    adv_li[1]=$("#al2");
    adv_li[2]=$("#al1");
    adv_imgs[0]=$("#adv_1");
    adv_imgs[1]=$("#adv_2");
    adv_imgs[2]=$("#adv_3");
    adv_imgs[0].css("left","0%");
    adv_imgs[1].css("left","100%");
    adv_imgs[2].css("left","100%");
    adv_li[0].css("background","red");
    $("#adv_img").on("swipeleft",function(){
        clearInterval(si);
        slid_l();
        si=setInterval(function(){
            slid_l();
        },5000);
    });
    $("#adv_img").on("swiperight",function(){
        clearInterval(si);
        slid_r();
        si=setInterval(function(){
            slid_l();
        },5000);
    });

    si=setInterval(function(){
        slid_l();
    },5000);



});
var adv_index=0;

function changeli(index){
    //alert(index);
    for(var i=0;i<=2;i++){
        if(i==index){
            adv_li[i].css("background","red");
        }else{
            adv_li[i].css("background","grey");
        }
    }
}

function slid_l(){
    for(var i=0;i<=2;i++){
        if(i!=adv_index)
            adv_imgs[i].css("left","100%");
    }
    if(adv_index<2){
        adv_imgs[adv_index].animate({left:'-100%'});
        adv_index++;
        changeli(adv_index);
        adv_imgs[adv_index].animate({left:'0%'});
    }else{
        adv_imgs[adv_index].animate({left:'-100%'});
        adv_index=0;
        changeli(adv_index);
        adv_imgs[adv_index].animate({left:'0%'});
    }

}
function slid_r(){
    for(var i=0;i<=2;i++){
        if(i!=adv_index)
            adv_imgs[i].css("left","-100%");
    }
    if(adv_index>0){
        adv_imgs[adv_index].animate({left:'100%'});
        adv_index--;
        changeli(adv_index);
        adv_imgs[adv_index].animate({left:'0%'});
    }else{
        adv_imgs[adv_index].animate({left:'100%'});
        adv_index=2;
        changeli(adv_index);
        adv_imgs[adv_index].animate({left:'0%'});
    }
}

/**************自动切换*****************/
var si;
/*******************触摸事件*************************/
//document.getElementById("#adv_img").addEventListener('touchmove', function(event) {
//    // 如果这个元素的位置内只有一个手指的话
//    if (event.targetTouches.length == 1) {
//        event.preventDefault();// 阻止浏览器默认事件，重要
//        var touch = event.targetTouches[0];
//        //把元素放在手指所在的位置
//        //obj.style.left = touch.pageX-50 + 'px';
//        //obj.style.top = touch.pageY-50 + 'px';
//    }
//}, false);
/*********************ajax建议angulaJS****************************/
function addmore(){
    /****ajax*****/
    var a=to_html(123,"../../material/img/people/0001.png","教师名字","简介简介简介简介简介简介简介简介简介简介简介简介简介","");
    $("#add_info").append(a+a);
    $("#123").trigger('create');
}

function to_html(t_id,img_path,t_name,t_info,t_tag){
    var s1="<div class=\"people_block\" id=\""+t_id+"\">";
    var s2="<div class=\"people-img-div\"><img src=\""+img_path+"\"></div>";
    var s3="<div class=\"people-info-div\">";
    var s4="<div class=\"people_name\">"+t_name+"</div>";
    var s5="<div style=\"display: block;width: 50%;height: 2px;background:black\"></div>"
    var s6="<div class=\"people_intro\">"+t_info+"</div>";
    var s7="<div class=\"people_tag\">"+t_tag+"</div></div> </div>";
    return s1+s2+s3+s4+s5+s6+s7;
}

