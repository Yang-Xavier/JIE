$(function(){
    var url=location.search;
    $("#userName").val(url.substr(1));
    $("#sub").click(function(){
            if(checkUser()&&checkEmail()){
                submit($("#userName").val(),$("#email").val());
            }
    });
    $("#sign").click(function(){
        location.href="sign.html";
    });
    $("#back").click(function(){
        history.go(-1);
    });

    $("#userName").focus(function(){
        $("#msg").css("display","none");
    });
    $("#email").focus(function(){
        $("#msg").css("display","none");
    });

});
/***********checkUserName*************/
function checkUser(){
    var userName=$("#userName").val();
    if(userName.length>0){
        if(userName.length<10){
            return true;
        }else{
            $("#msg").html("用户名非法！").css("display","block");
        }
    }else{
        $("#msg").html("请输入用户名!").css("display","block");
    }
}

/************checkEmail********************/
function checkEmail(){
    var email=$("#email").val();
    var c_e = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(email.length>0){
        if (c_e.test(email.trim())) {
            return true;
        }else{
            $("#msg").html("请输入用正确邮箱!").css("display","block");
        }
    }
    else{
            $("#msg").html("请输入用邮箱!").css("display","block");
    }
}
/*****************submit*******************/
function submit(userName,email){

}