/**
 * Created by samsung on 2016/2/4.
 */
/********page all*************/
$(function(){
    /*****1*******/

    $("#tel").focus(function(){
            $("#phoneError").css("display","none");
        });

    $("#send_code").click(function(){
            if(checkPhone()){
                $("#code").val("123456");
                /***/
                phone_flag=true;
                /***/
            }

        });

    $("#login").click(function(){
        location.href="login.html";
    });

    $("#next1").click(function(){
            if(checkPhone()&&next1){
                location.href="#page2";
            }else{
                alert("验证码填写不正确！");
            }
        });

    /*****2*****/

    $("#tname").focus(function(){
        $("#nameError").css("display","none");
    });

    $("#tname").blur(function(){
        checkName();
    });


    $("#age").focus(function(){
        $("#ageError").css("display","none");
    });

    $("#age").blur(function(){
        checkAge();
    });

    $("#email").focus(function(){
        $("#emailError").css("display","none");
    });
    $("#email").blur(function(){
        checkEmail();
    });


    $("#next2").click(function(){
        if(checkEduSch()) {
            if (checkEmail() && checkAge() && checkName()) {
                info_flag=true;
                location.href = "#page3";
            }else{
                alert("请完善信息");
            }
        }else {
            alert("请选择正确学历和学校！");
        }
    });

    /*****3******/
    $("#reserve2").click(function(){
        window.history.go(-1);
    });

    $("#userName").blur(function(){
        checkUser();
    });

    $("#resure").blur(function(){
        checkPwd();
    });

    $("#sub").click(function(){
        if(checkUser()&&checkPwd()){
            if(phone_flag){
                if(info_flag){
                    sub();
                }
                else
                    location.href="#page2";
            }
            else
                location.href="#page1";
        }else{
            alert("请完信息！");
        }
    });

});

/*********page1***************/
var phone_flag=false;
function checkPhone(){
    var c_t=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[7|8|9])\d{8}$/;
    //手机号验证正则表达式
    var tel=$("#tel").val();
    if(tel.length!=0) {
        if (c_t.test(tel.trim())) {
            return true;
        } else {
            $("#phoneError").html("请输入正确手机号码！").css("display","block");
        }
    }
    else{
        $("#phoneError").html("请输入号码！").css("display","block");
    }
}
/*********page2***************/
var info_flag=false;
function checkName(){
    var tname = $("#tname").val();
    if(tname.length!=0&&tname.length<10){
        return true;
    }else{
        $("#nameError").html("请输入真实姓名！").css("display","block");
    }
}
function checkAge(){
    var age = $("#age").val();
    if(age.length!=0){
        if(age>0&&age<99){
            return true;
        }else{
            $("#ageError").html("请输入正确年龄！");
            $("#ageError").css("display","block");
        }
    }else{
        $("#ageError").html("请输入年龄！");
        $("#ageError").css("display","block");
    }
}
function checkEmail(){
    var c_e = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var email = $("#email").val();
    if(email.length!=0) {
        if (c_e.test(email.trim())) {
            return true;
        }
        else {
            $("#emailError").html("请输入正确邮箱！").css("display","block");
        }
    }
    else{
        $("#emailError").html("请输入邮箱！").css("display","block");
    }
}
function checkEduSch(){
    var edu = $("#edu option:selected").text();
    var other = $("#other_input").val();
    var school = $("#school option:selected").text();
    if ((edu == "其它" && other.length != 0 && other.length < 20) || (edu != "其它" && school.length != 0)) {
        if (edu == "其它") {
            edu = other;
            school = "其他";
        }
        return true;
    }

}


/*********page3***************/
function checkUser(){
    var userName = $("#userName").val();
    if(userName.length!=0){
        if(userName.length<10){
            if(ajaxuserName()){
                $("#userError").html("恭喜你，用户名可以使用！").css("display","block").css("color","blue");
                return true;
            }
        }else{
            $("#userError").html("用户名不得超过10个字符！").css("display","block").css("color","red");
        }
    }else{
        $("#userError").html("请输入用户名！").css("display","block").css("color","red");
    }
}

function checkPwd(){
    var pwd1 = $("#password").val();
    var pwd2 = $("#resure").val();
    if(pwd1.length!=0){
        if(pwd1.length>=6&&pwd1.length<20){
            if(pwd1==pwd2){
                $("#pwdError").html("密码可以使用！").css("display","block").css("color","blue");
                return true;
            }else{
                $("#pwdError").html("两次密码不一致！").css("display","block").css("color","red");
            }
        }else{
            $("#pwdError").html("密码请大于6位小于20位！").css("display","block").css("color","red");
        }
    }else{
        $("#pwdError").html("请输入密码！").css("display","block");
    }
}

function sub(){
    var tname = $("#tname").val();
    var age = $("#age").val();
    var sex = $("input[name='gender']:checked").val();
    var email = $("#email").val();
    var edu = $("#edu option:selected").text();
    var school = $("#school option:selected").text();

    var userName = $("#userName").val();
    var pwd=hex_md5($("#password").val());

    var msg="?tname="+tname+"&age="+age+"&sex="+sex+"&email="+email+"&edu="+edu+"&school="+school+"&userName="+userName+"&password="+pwd;
    alert(msg);

}

/**********************AJAX*****************************/
function ajaxuserName(userName){
    return true;
}
/**************************************************************/

/*************************AngularJS****************************/
var app=angular.module('getSchool',[]);
app.controller('getSchoolCtrl',function($scope,$http){
    $scope.addOther = function(x){
        if(x=="其它"){
            $("#school_d").css("display","none");
            $("#other").css("display","block");
        }else{
            $("#school_d").css("display","block");
            $("#other").css("display","none");
            $http.get("../../material/json/schoolName.json").success(function(response){
                switch(x){
                    case "小学":
                        $scope.schools=response.primarySchool;
                        break;
                    case "初中":
                        $scope.schools=response.middleSchool;
                        break;
                    case "高中":
                        $scope.schools=response.highSchool;
                        break;
                    case "大学":
                        $scope.schools=response.college;
                        break;
                    default :
                        break;
                }

            });
        }

    };
});


/**************************************************************/