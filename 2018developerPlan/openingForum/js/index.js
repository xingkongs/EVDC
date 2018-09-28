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
        $(".goTop .goTop_img:last-of-type").css("opacity", "1");
    } else {
        $(".goTop .goTop_img:last-of-type").css("opacity", "0");
    }
});
template.defaults.escape = false;
var Material = template("lists", data.background);
document.querySelector("#information .content").innerHTML = Material;
var expert = template("partners", data.expert);
document.querySelector("#expert .content").innerHTML = expert;
var agendaList = template("agendas", data);
document.querySelector("#agenda .agenda_list").innerHTML = agendaList;
var parter = template("partners", data.parter);
document.querySelector("#parter .content").innerHTML = parter;
var parter = template("partners", data.parter);
document.querySelector("#medias .content").innerHTML = parter;
// 文件上传

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
function myAjax() {
    var $form=$('#myform').closest(".am-form");
    $data = $("#myform").serialize();
    $.ajax({
        type: "post",
        url: "//www.d1ev.com/form/index/ajax_signup",
        dataType: "json",
        xhrFields: {withCredentials: true},
        data: $data,
        success: function (_msg) {
            if (data.code === 0) {
                $("#doc-modal-5").modal('close');
                alerts($('.successmessage'),'',2000,1);
                var time = setTimeout(function () {
                    window.location.reload();
                }, 2000)
            } else {
                alerts($('.my_alert'), _msg.message, 2000);
            }
        }
    });
}
