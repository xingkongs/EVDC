
//lazyload
function showImg($el) {
    $el.attr('src', $el.attr('data-src'));
}

var Exposure = (function () {
    var _queue = [];
    var _isBind = false;

    function one($selectors, callback) {
        _add($selectors, callback);
        _init();
    }

    function _add($selector, callback) {
        $selector.each(function () {
            $cur = $(this);
            var o = {
                el: $cur,
                cb: callback
            };
            _queue.push(o);
        });
    }

    function _init() {
        if (!_isBind) {
            _bind();
        }
        _do();
    }

    function _bind() {

        var timer = null,
            interval = 40;

        $(window).on('scroll', function (e) {
            timer && clearTimeout(timer);
            timer = setTimeout(function () {
                _do();
            }, interval);
        });

        _isBind = true;
    }

    function _do() {

        var arrTmp = [];
        for (var i = 0; i < _queue.length; i++) {
            var item = _queue[i];
            if (_isShow(item.el)) {
                item.cb.call(item.el[0]);
            } else {
                arrTmp.push(item);
            }
        }

        _queue = arrTmp;
    }

    function _isShow($el) {
        var scrollH = $(document).scrollTop(),
            winH = $(window).height(),
            top = $el.offset().top;
        return  (top < winH + scrollH);
    }

    return {
        one: one
    };
})();

var $imgs = $('img');
Exposure.one($imgs, function () {
    showImg($(this));
});
// 滚动监听
$(window).on("scroll",function(){
    if(window.scrollY>0){
        $("#header .am-topbar").css("background","rgba(26, 10, 44, 0.95)");
    }
});
// 平滑
$("#collapse-head").scrollspynav({offsetTop: 45});


// tab切换
$("#doc-modal-3").on("click","#activity_tab span",function(){
    var $index=$(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    var $content=$("#activity_content").find(".contents");
    $content.eq($index).show().siblings(".contents").hide();
});
// 文件上传
$(function () {
    $('#doc-form-file').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data);
            if (data.result.errcode === 0) {
                processval("100%");
            //.find(".file_type").html(data.result.extension)
                $("#filename").val(data.result.result.fullpath);
                $(".file--clear").find(".file_name").html(data.result.result.name);
                $(".file_upload").hide();
                $(".file--clear").show();

            } else {
                //alerts($('.falsemessage'),'',2000,1);
                $(".am-modal .falsetip").find("span").html(data.result.errmsg).end().show();
            }

        },
        fail:function(e,data){
            console.log("error");
            $(".am-modal .falsetip").find("span").html("文件不能大于20M").end().show();
        }

    });
});

$("#file_clear").on("click",function(){
    $(this).closest(".file--clear").hide().siblings(".file_upload").show();

});
// 倒计时
!(function GetRTime(){
    var EndTime= new Date('2017/08/03 00:00:00');
    var NowTime = new Date();
    var t =EndTime.getTime() - NowTime.getTime();
    var d=0;
    if(t>=0){
        d=Math.floor(t/1000/60/60/24);
    }
    document.getElementById("countdown").innerHTML = d;
})();

function openmodal(thisone){
    var $span=$("#activity_tab").find("span");
    if(thisone==="a"){
        $span.eq(0).click();
    }else if(thisone==="b"){
        $span.eq(1).click();
    }else{
        $span.eq(2).click();
    }
    if(window.innerWidth<1440) {
        $("#collapse-head").addClass("fadeOutUp");
    }
    $("#doc-modal-3").modal({closeViaDimmer: 0, width: 480});
}
function alerts (ele, str,time1,location) {
    var time=time1 || 2000;
    //alert弹窗 ie8 、9
    if (ele.length > 0) {
        if (window.navigator.userAgent.indexOf("MSIE 9.0") > 0 || window.navigator.userAgent.indexOf("MSIE 8.0") > 0) {
            console.log('ie89');
            ele.css({'margin-left': -ele.width() / 2, 'margin-top': -ele.height() / 2});
        }
    } else {
        ele.css({'margin-left': 0, 'margin-top': 0});
    }
    ele.show();
    setTimeout(function () {
        ele.hide();
        //console.log(Boolean(location));
        if(Boolean(location)){
            // window.location.reload(true);
        }
        window.location.reload();

    }, time);
}
function processval(val){
    $(".fileprocess").css("display","block");
    var time=setTimeout(function(){ $("#processes").css("width",val);},1000);
    var time2=setTimeout(function(){$(".fileprocess").css("display","none");$("#processes").css("width","10%");},3000)
}

$('#doc-modal-3').find('.am-btn--form').click(function () {
    var $form=$(this).closest(".am-form");
    var $type=$form.find("input[name=type]").val();
    if($type==="3"){
        $.ajax({
            type: "post",
            url: "http://www.d1ev.com/contents/baoming/formsubmit",
            dataType: "json",
            data: {
                realname: $form.find("input[name=realname]").val(),
                tel: $form.find("input[name=tel]").val(),
                email: $form.find("input[name=email]").val(),
                pj_name: $form.find("input[name=pj_name]").val(),
                pj_type: $form.find("select[name=pj_type]").val(),
                pj_desc: $form.find("textarea[name=pj_desc]").val(),
                pj_bp: $form.find("input[name=pj_bp]").val(),
                type: $form.find("input[name=type]").val(),
                istel: $form.find("input[name=istel]").val()
            },
            success: function (_msg) {
                console.log(_msg.errcode);
                if (_msg.errcode === 0) {
                    $("#doc-modal-3").modal('close');
                    alerts($('.successmessage'),'',2000,1);
                } else {
                    //alerts($('.falsemessage'),'',2000,1);
                    $form.find(".returntip").find("span").html(_msg.errmsg).end().show();
                }
            }
        });
    }else{
        $.ajax({
            type: "post",
            url: "http://www.d1ev.com/contents/baoming/formsubmit",
            dataType: "json",
            data: {
                realname: $form.find("input[name=realname]").val(),
                tel: $form.find("input[name=tel]").val(),
                email: $form.find("input[name=email]").val(),
                company: $form.find("input[name=company]").val(),
                position: $form.find("input[name=position]").val(),
                type: $form.find("input[name=type]").val(),
                istel: $form.find("input[name=istel]").val()
            },
            success: function (_msg) {
                console.log(_msg.errcode);
                if (_msg.errcode === 0) {
                    $("#doc-modal-3").modal('close');
                    alerts($('.successmessage'),'',2000,1);
                } else {
                    //alerts($('.falsemessage'),'',2000,1);
                    $form.find(".returntip").find("span").html(_msg.errmsg).end().show();
                }
            }
        });
    }


});

$(function () {
    //导航部分
    if(window.innerWidth<1440){
        console.log(1);
        $("#collapse-head").headroom({
            tolerance: 5,
            offset: 205,
            classes: {
                initial: "animated",
                pinned: "fadeInDown",
                unpinned: "fadeOutUp"
            }
        });
    }

});