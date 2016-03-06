/**
 * Created by samsung on 2016/2/5.
 */
$(function(){
    $("#login").click(function(){
        var pwd_md5="";
        var userName="";
        if(checkUser()){
            if(checkPassword()){
                pwd_md5=passwordToMd5();
                userName=$("#userName").val();
                sunbit(pwd_md5,userName);
            }
        }
    });
    $("#sign").click(function(){
       location.href="../html/sign.html";
    });
    $("#forget").click(function(){
        location.href="../html/forget.html?"+$("#userName").val();
    });
});
/******password******/
function checkPassword(){
    if ($("#password").val().length > 0) {
        return true;
    }else{
        $("#msg").html("请输入密码！");
    }
}
function passwordToMd5() {
    var pwd = $("#password").val();
    return hex_md5(pwd);
}
/********忘记密码************/
function forget(){
    $("#forget").css("display","block");
}
/*******userName**********/
function checkUser(){
    var userName=$("#userName").val();
    if(userName.length<10&&userName.length>0){
        return true;
    }else{
        $("#msg").html("用户名非法！");
    }
}
/*********submit****************/
function sunbit(userName,pwd){
    var str="?userName="+userName+"&password="+pwd;
    alert(str);
    forget();
}
/**********Ajax submit*****************/

/************验证码*********************/

function code(){
    $("#code").css("display","block");
}

