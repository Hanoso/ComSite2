// --------------------------------------------------- //
// 导航
layui.use('element', function () {
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块

    //监听导航点击
    element.on('nav(demo)', function (elem) {
        //console.log(elem)
        layer.msg(elem.text());

        $('layui-nav li').click(function () {
            $('.layui-this').removeClass('layui-this');
            $(this).addClass("layui-this");
        });

    });
});

// --------------------------------------------------- //
// 轮播图
layui.use(['carousel', 'form'], function () {
    var carousel = layui.carousel
        , form = layui.form;

    //图片轮播
    carousel.render({
        elem: '#layui-banner'
        , width: '980px'
        , height: '400px'
        , interval: 3000
        , anim: 'fade'
    });

    var $ = layui.$, active = {
        set: function (othis) {
            var THIS = 'layui-bg-normal'
                , key = othis.data('key')
                , options = {};

            othis.css('background-color', '#5FB878').siblings().removeAttr('style');
            options[key] = othis.data('value');
            ins3.reload(options);
        }
    };

    //监听开关
    form.on('switch(autoplay)', function () {
        ins3.reload({
            autoplay: this.checked
        });
    });

    $('.demoSet').on('keyup', function () {
        var value = this.value
            , options = {};
        if (!/^\d+$/.test(value)) return;

        options[this.name] = value;
        ins3.reload(options);
    });

    //其它示例
    $('.demoTest .layui-btn').on('click', function () {
        var othis = $(this), type = othis.data('type');
        active[type] ? active[type].call(this, othis) : '';
    });
});

// --------------------------------------------------- //
// 流加载
layui.use('flow', function () {
    var flow = layui.flow;

    flow.load({
        elem: '#LAY_product1' //流加载容器
        , scrollElem: '#LAY_product1' //滚动条所在元素，一般不用填，此处只是演示需要。
        , done: function (page, next) { //执行下一页的回调

            //模拟数据插入
            setTimeout(function () {
                var lis = [];
                for (var i = 0; i < 8; i++) {
                    lis.push('<li>' + ((page - 1) * 8 + i + 1) + '</li>')
                }

                //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                next(lis.join(''), page < 10); //假设总页数为 10
            }, 500);
        }
    });

    //按屏加载图片
    flow.lazyimg({
        elem: '#LAY_product img'
        , scrollElem: '#LAY_product' //一般不用设置，此处只是演示需要。
    });
});

// --------------------------------------------------- //
// about页面侧边切换卡
//Hash地址的定位
layui.use('element', function () {
    var $ = layui.jquery
        , element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

    //Hash地址的定位
    var layid = location.hash.replace(/^/, '');
    element.tabChange('about', layid);

    element.on('tab(about)', function (elem) {
        location.hash = $(this).attr('lay-id');
    });

});


// --------------------------------------------------- //
// 表单

layui.use(['form', 'layedit', 'laydate'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate;

    //自定义验证规则
    form.verify({
        company: function (value) {
            if (value.length < 5) {
                return '公司名称至少5个字符';
            }
        },
        captcha: function (value) {
            console.log(value);
            console.log($('#id_captcha_0').val());
            if (value.length !== 4){
                return '验证码错误'
            }
        }
        // , pass: [
        //     /^[\S]{6,12}$/
        //     , '密码必须6到12位，且不能出现空格'
        // ]
        , content: function (value) {
            layedit.sync(editIndex);
        }

    });

// 复选框
    form.on('checkbox(choiceOne)', function (data) {
        console.debug(data);
        var len = $("input:checked").length;
        if (len < 1) {
            $(data.elem).next().attr("class", "layui-unselect layui-form-checkbox");
            $(data.elem).prop("checked", false);
            layer.msg('1请至少选择一项产品！', {icon: 5});
            // return false;
        }
    });

    //监听提交
    form.on('submit(link)', function (data) {
        var len = $("input:checked").length;
        if (len < 1) {
            layer.msg('2请至少选择一项产品！', {icon: 2});
            return false;
        }
        var datas = JSON.stringify(data.field);
        layer.alert(datas(data.field));
        // layer.alert(JSON.stringify(data.field), {
        //     title: '最终的提交信息'
        // });
        return false;

    });

});


// --------------------------------------------------- //
// 多图上传
layui.use('upload', function(){
  var $ = layui.jquery
  ,upload = layui.upload;

  //普通图片上传
  var uploadInst = upload.render({
    elem: '#test1'
    ,url: '/upload/'
    ,before: function(obj){
      //预读本地文件示例，不支持ie8
      obj.preview(function(index, file, result){
        $('#demo1').attr('src', result); //图片链接（base64）
      });
    }
    ,done: function(res){
      //如果上传失败
      if(res.code > 0){
        return layer.msg('上传失败');
      }
      //上传成功
    }
    ,error: function(){
      //演示失败状态，并实现重传
      var demoText = $('#demoText');
      demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
      demoText.find('.demo-reload').on('click', function(){
        uploadInst.upload();
      });
    }
  });

  //多图片上传
  upload.render({
    elem: '#test2'
    ,url: '/upload/'
    ,multiple: true
    ,before: function(obj){
      //预读本地文件示例，不支持ie8
      obj.preview(function(index, file, result){
        $('#demo2').append('<img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img">')
      });
    }
    ,done: function(res){
      //上传完毕
    }
  });

});