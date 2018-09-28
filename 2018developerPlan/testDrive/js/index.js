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
$(document).on("scroll", function (e) {
    if ($(this).scrollTop() > 200) {
        $(".goTop .goTop_img:last-of-type").css("opacity", "1");
    } else {
        $(".goTop .goTop_img:last-of-type").css("opacity", "0");
    }
});
template.defaults.escape = false;
var Material = template("lists", data.automodels);
document.querySelector("#autoModel .content").innerHTML = Material;

