$(function () {
    //导航选择
    var tempUrls = tempUrl.split("#");
    window.alert('测试');
    if (tempUrls[1] == "") {
    } else if (tempUrls[1] == "首页") {
        var obj = $("li[id='hli_Home']");
        $(obj).addClass("active");
    } else if (tempUrls[1] == "关于我们") {
        var obj = $("li[id='hli_AboutUs']");
        $(obj).addClass("active");
    } else if (tempUrls[1] == "产品分类") {
        var obj = $("li[id='hli_Products']");
        $(obj).addClass("active");
    } else if (tempUrls[1] == "服务与支持") {

        var obj = $("li[id='hli_ServiceSupport']");
        $(obj).addClass("active");
    } else if (tempUrls[1] == "新闻动态") {
        var obj = $("li[id='hli_News']");
        $(obj).addClass("active");
    } else if (tempUrls[1] == "联系我们") {
        var obj = $("li[id='hli_ContactUs']");
        $(obj).addClass("active");
    } else {
        var obj = $("li[id='hli_Home']");
        $(obj).addClass("active");
    }

    jQuery('#header').each(function () {
        var $root = jQuery(this);
        var $lev2_div = $root.find('.js_lev2_div');
        var $lev_1 = $root.find('li.lev_1');
        var original_active_idx = $root.find('li.lev_1').filter('.active').index();
        $lev_1.each(function () {
            var $this_item = jQuery(this);
            var $level_2_ul = $this_item.find('.js_level_2');

            $this_item.mouseover(function () {
                if ($level_2_ul.length > 0) {
                    $lev_1.removeClass('active');
                    $this_item.addClass('active');
                    $lev2_div.show();
                    $level_2_ul.show();
                } else {
                    $lev_1.removeClass('active');
                    $this_item.addClass('active');
                }
            }).mouseleave(function () {
                $this_item.removeClass('active');
                $lev_1.eq(original_active_idx).addClass('active');
                $lev2_div.hide();
                $level_2_ul.hide();
            });
        });

    });

});
