var tagData = [{"id":12,"name":"长者","status":0},{"id":13,"name":"工厂"},{"id":14,"name":"小学生"},{"id":15,"name":"大学生"},{"id":16,"name":"研究生"},{"id":17,"name":"教师"},{"id":18,"name":"记者"}];
var catData = [{"id":1,"name":"周边旅游","children":[{"id":24,"name":"广东","status":0,"children":[{"id":7,"name":"广州"},{"id":23,"name":"潮州"}]}]},{"id":5,"name":"国内旅游","children":[{"id":8,"name":"华北地区","children":[{"id":9,"name":"北京"}]}]},{"id":6,"name":"出境旅游","children":[{"id":10,"name":"东南亚","children":[{"id":11,"name":"马来西亚","children":[{"id":20,"name":"沙巴","children":[{"id":21,"name":"美人鱼岛","children":[{"id":22,"name":"潜水"}]}]}]}]}]}];

  layui.config({
    base : ''
  }).extend({
    selectN: '/static/layui/selectN',
    selectM: '/static/layui/selectM',
  }).use(['layer','form','jquery','selectN','selectM'],function() {
      $ = layui.jquery;
      var form = layui.form
          , selectN = layui.selectN
          , selectM = layui.selectM;


      //无限级分类-基本配置
      var catIns1 = selectN({
          //元素容器【必填】
          elem: '#cat_ids1'
          , search: [false, true]
          //候选数据【必填】
          , data: '/static/layui/citydata.json'
          , name: 'procity'
          , verify: 'required'
      });


      //无限级分类-所有配置
      var catIns2 = selectN({
          //元素容器【必填】
          elem: '#cat_ids2'
          //候选数据【必填】
          , data: catData
          //设置了长度
          , width: null
          //默认值
          , selected: [6, 10, 11]

          //为真只取最后一个值
          , last: true

          //空值项提示，可设置为数组['请选择省','请选择市','请选择县']
          , tips: '请选择'

          //事件过滤器，lay-filter名 不设置与选择器相同(去#.)
          , filter: ''

          //input的name 不设置与选择器相同(去#.)
          , name: 'cat2'

          //数据分隔符
          , delimiter: ','

          //数据的键名
          , field: {idName: 'id', titleName: 'name', childName: 'children'}

          //表单区分 form.render(type, filter); 为class="layui-form" 所在元素的 lay-filter="" 的值
          , formFilter: null

      });

      form.on('submit(demo)', function (data) {
          console.log('catIns1 当前选中的值名：', catIns1.selected);
          console.log('catIns1 当前选中的值：', catIns1.values);
          console.log('catIns1 当前选中的名：', catIns1.names);
          console.log('catIns1 当前最后一个选中值：', catIns1.lastValue);
          console.log('catIns1 当前最后一个选中名：', catIns1.lastName);
          console.log('catIns1 当前最后一个是否已选：', catIns1.isSelected);
          console.log('');

          var formData = data.field;
          console.log('表单对象：', formData);
      });
  });

