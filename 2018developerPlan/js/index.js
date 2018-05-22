function alerts(ele, str, time1, callback) {
    function doalert(ele){
        var $ele = ele || $alert;
        var time = time1 || 2000;
        if ($ele.length > 0) {
            if (window.navigator.userAgent.indexOf("MSIE 9.0") > 0 || window.navigator.userAgent.indexOf("MSIE 8.0") > 0) {
                $ele.css({'margin-left': -$ele.width() / 2, 'margin-top': -$ele.height() / 2});
            }
        } else {
            $ele.css({'margin-left': 0, 'margin-top': 0});
        }
        if(str){
            $ele.show().html(str);
        }else{
            $ele.show()
        }
        setTimeout(function () {
            $ele.hide();
            if (Boolean(callback)) {
            }
        }, time);
    }
    if(!ele.length){
        var dom = document.createElement("div");
       dom.className = "my_alert";
       document.body.appendChild(dom);
        $alert = $(".my_alert");
        doalert();
    }else{
        doalert(ele);
    }
}
function processval(val){
    $(".fileprocess").css("display","block");
    var time=setTimeout(function(){ $("#processes").css("width",val);},1000);
    var time2=setTimeout(function(){$(".fileprocess").css("display","none");$("#processes").css("width","10%");},3000)
}
$(document).on("scroll", function (e) {
    if ($(this).scrollTop() > 200) {
        $(".goTop li:last-of-type").css("opacity", "1");
    } else {
        $(".goTop li:last-of-type").css("opacity", "0");
    }
});
template.defaults.escape = false;
var requirement = template("lists", data.requirements);
document.querySelector("#requirements .content").innerHTML = requirement;
var Material = template("lists", data.materials);
document.querySelector("#requiredMaterials .content").innerHTML = Material;
var agendaList = template("agendas", data);
document.querySelector("#agenda .agenda_list").innerHTML = agendaList;
var rewardsLists = template("lists", data.rewards);
document.querySelector("#rewards .content").innerHTML = rewardsLists;
var criteriaLists= template("lists", data.criteria);
document.querySelector("#judging .content").innerHTML = criteriaLists;
var partner = template("partners", data);
document.querySelector("#expert .content").innerHTML = partner;
// 文件上传
$(function () {
    $('#doc-form-file').fileupload({
        maxFileSize: 16 * 1024 * 1024,
        done: function (e, data) {
            console.log(data);
            if (data.result.success) {
                processval("100%");
                //.find(".file_type").html(data.result.extension)
                //$("#filename").val(data.result.data.name);
                $(".file--clear").find(".file_name").html(data.result.data.name);
                $("#file_name").val(data.result.data.url)
                $(".file_upload").hide();
                $(".file--clear").show();

            } else {
                //alerts($('.falsemessage'),'',2000,1);
                $(".am-modal .falsetip").find("span").html(data.result.msg).end().show();
            }

        },
        fail:function(e,data){
            console.log("error");
            $(".am-modal .falsetip").find("span").html("文件不能大于20M").end().show();
        }

    });
    $('#doc-form-file02').fileupload({
        maxFileSize: 16 * 1024 * 1024,
        done: function (e, data) {
            console.log(data);
            if (data.result.success) {
                processval("100%");
                //.find(".file_type").html(data.result.extension)
                //$("#filename02").val(data.result.data.name);
                $(".file--clear02").find(".file_name02").html(data.result.data.name);
                $("#file_name02").val(data.result.data.url);
                $(".file_upload02").hide();
                $(".file--clear02").show();

            } else {
                //alerts($('.falsemessage'),'',2000,1);
                $(".am-modal .falsetip02").find("span").html(data.result.msg).end().show();
            }

        },
        fail:function(e,data){
            console.log("error");
            $(".am-modal .falsetip02").find("span").html("请按要求上传图片").end().show();
        }

    });
});
$("#file_clear").on("click",function(){
    $(this).closest(".file--clear").hide().siblings(".file_upload").show().find("#file_name").val("");
});
$("#file_clear02").on("click",function(){
    $(this).closest(".file--clear02").hide().siblings(".file_upload02").show().find("#file_name02").val("");
});
$("#myform").validator({
    submit: function() {
      var formValidity = this.isFormValid();
      console.warn('验证状态：', formValidity ? '通过' : '未通过');
     if(!formValidity){

     }else{
        myAjax()
     }
     return false;

    },
    onValid: function(validity) {
      $(validity.field).closest('.modal_option').find('.returntip').hide();
    },
    onInValid: function(validity) {
      var $field = $(validity.field);
      var $group = $field.closest('.modal_option');
      var $alert = $group.find(".returntip");
      $alert.show();
    }
  });
$("#myform02").validator({
    submit: function() {
        var formValidity = this.isFormValid();
        console.warn('验证状态：', formValidity ? '通过' : '未通过');
        if(!formValidity){

        }else{
            myAjax02()
        }
        return false;

    },
    onValid: function(validity) {
        $(validity.field).closest('.modal_option').find('.returntip').hide();
    },
    onInValid: function(validity) {
        var $field = $(validity.field);
        var $group = $field.closest('.modal_option');
        var $alert = $group.find(".returntip");
        $alert.show();
    }
});
function myAjax() {
    var $form=$('#myform').closest(".am-form");
    $data = $("#myform").serialize();
    $.ajax({
        type: "post",
        url: "//www.d1ev.com/gnev/project/save",
        dataType: "json",
        data: $data,
        success: function (_msg) {
            console.log(_msg);
            if (_msg.success) {
                $("#doc-modal-3").modal('close');
                alerts($('.successmessage'),'',2000,1);
            } else {
                alerts($('.my_alert'), _msg.errmsg, 2000);
                $form.find(".returntip").find("span").html(_msg.msg).end().show();
            }
        }
    });
}
function myAjax02() {
    var $form=$('#myform02').closest(".am-form");
    $data = $("#myform02").serialize();
    $.ajax({
        type: "post",
        url: "//www.d1ev.com/gnev/project/save",
        dataType: "json",
        data: $data,
        success: function (_msg) {
            console.log(_msg);
            if (_msg.success) {
                $("#doc-modal-4").modal('close');
                alerts($('.successmessage'),'',2000,1);
            } else {
                alerts($('.my_alert'), _msg.errmsg, 2000);
                $form.find(".returntip").find("span").html(_msg.msg).end().show();
            }
        }
    });
}