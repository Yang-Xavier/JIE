$(function(){
   $("#edit_sub").parent().click(function(){
       if($("#edit_sub").html()=="编辑"){
           $("#edit_sub").html("提交");
           $("#cancel").css("display","block");
           $("#edu_d").css("display","block");
           $("#school_d").css("display","block");
           $("#edu_f").css("display","none");
           $("#school_f").css("display","none");

       }else if($("#edit_sub").html()=="提交"){
           $("#edit_sub").html("编辑");
           $("#cancel").css("display","none");
       }
   });
    $("#cancel").parent().click(function(){
        location.reload();
    })
});
/*************************AngularJS**********************************/
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

/*************************AngularJS**********************************/