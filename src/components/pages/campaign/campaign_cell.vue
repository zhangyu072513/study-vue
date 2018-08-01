<template>
  <div class="main-content" style="background-color:#fff;">
    <div>
      <h3 id="title">{{$route.params.name}}</h3>
      <!-- 图表 -->
      <div id="chart-baby" style="width:99%;height:350px;margin-top:20px;"></div>
      <div class="plan">
        <div class="plan-top">
          <p class="p-title">
            <a class="a-1" href="#">宝贝推广</a>
            <a href="">店铺推广</a>
          </p>
          <p class="p-1">
            <button>
              <i class="fa fa-plus"></i>新建宝贝推广</button>
            <!-- <button>
                          <i class="fa fa-plus"></i>店铺推广</button> -->
          </p>
        </div>
        <div class="plan-table">
          <table class="layui-table" lay-skin="line" lay-even>
            <thead>
              <tr>
                <th>状态</th>
                <th>推广单元</th>
                <th>默认出价</th>
                <th>移动出价比例</th>
                <th>展现量</th>
                <th>点击量</th>
                <th>点击率</th>
                <th>花费</th>
                <th>投入产出比</th>
                <th>点击转化率</th>
              </tr>
            </thead>
            <tbody id="index-plan" class="deer">
              <tr v-for="i in data">
                <td class='td-status'>{{i.status}}</td>
                <td class="td-name-1 td-blue">
                  <router-link :to="{name:'baby',params:{id:i.unit_id,name:i.name,imgurl:i.image_url,price:i.price}}">
                    <img :src="i.image_url"/><u>{{i.name}}<br><span>{{i.price}}元</span></u>
                  </router-link>
                </td>
                <td>{{i.default_price}}元</td>
                <td>{{i.mobile_price_percent}}%</td>
                <td>{{i.display_num}}</td>
                <td>{{i.click_num}}</td>
                <td>{{i.click_percent}}</td>
                <td>{{i.cost}}元</td>
                <td>{{i.in_out_percent}}</td>
                <td>{{i.click_conv_percent}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from "../../../api/api";
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  data() {
    return {
      data: []
    };
  },
  methods: {
    // echart折线图
    drawLine() {
      // 获取时间

      Date.prototype.Format = function(fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "H+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };

      let myChart = echarts.init(document.getElementById("chart-baby"));
      let option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: []
        },
         grid: {
          left: "5%",
          right: "16%",
          bottom: "0%", // 这几个属性可以控制图表上下左右的空白尺寸，可以自己试试。
          containLabel: true
        },
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            magicType: {
              show: true,
              type: ["line", "bar", "stack", "tiled"]
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        culable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: []
          }
        ],
        yAxis: [
          { 
            name:'展现量',
            type: "value",
            nameLocation:'middle',
            nameRotate:30
          },
          { 
            name:'点击量',
            type: "value",
            position:'left',
            offset:70,
            nameLocation:'middle',
            nameRotate:30,           
          },
          { 
            name:'点击率',
            type: "value",
            position:'right',
            // offset:70,
            nameLocation:'middle',
            nameRotate:30, 
          },
          { 
            name:'点击转化率',
            type: "value",
            position:'right',
            offset:70,
            nameLocation:'middle',
            nameRotate:30, 
          },
          { 
            name:'投入产出比',
            type: "value",
            position:'right',
            offset:140,
            nameLocation:'middle',
            nameRotate:30, 
          },
          { 
            name:'平均点击花费',
            type: "value",
            position:'right',
            offset:210,
            nameLocation:'middle',
            nameRotate:30, 
          }
        ],
        series: [
          {smooth:true,  //这个是把线变成曲线
          }
        ]
      };
      let result = get(
        "rest/web/auth/promote_plan/trend?plan_id=" + this.$route.params.id
      );
      result.then(res => {
        // this.data = res.data;
        var list = res.data;
        var display_num = [];
        var click_num = [];
        var click_percent = [];
        var click_conv_percent = [];
        var in_out_percent = [];
        var avg_click_cost =[];
        var date = [];
        var seriesData = [];
        var legends = []; // 准备存放图例数据
        var Series = []; // 准备存放图表数据
        // console.log(list);
        for (var i = 0; i < list.length; i++) {
          display_num.push(list[i].display_num);
          click_num.push(list[i].click_num);
          click_percent.push(list[i].click_percent);
          click_conv_percent.push(list[i].click_conv_percent);
          in_out_percent.push(list[i].in_out_percent);
          avg_click_cost.push(list[i].avg_click_cost)
          date.push(list[i].date);
        }
        display_num.reverse(); //数据倒置
        click_num.reverse(); //数据倒置
        click_percent.reverse(); //数据倒置
        click_conv_percent.reverse(); //数据倒置
        in_out_percent.reverse(); //数据倒置
        avg_click_cost.reverse();
        seriesData.push(display_num);
        seriesData.push(click_num);
        seriesData.push(click_percent);
        seriesData.push(click_conv_percent);
        seriesData.push(in_out_percent);
        seriesData.push(avg_click_cost);
        console.log(seriesData);
        //myChart.showLoading(); //数据加载完之前先显示一段简单的loading动画
        var names = ["展现量", "点击量", "点击率", "点击转换率", "投入产出比","平均点击花费"];
        legends = names;
        date.reverse();
        var Item = function() {
          return {
            name: "",
            type: "line",
            // smooth:true,
            // stack:'总量',
            data: []
          };
        }; // series中的每一项为一个item,所有的属性均可以在此处定义
        for (var i = 0; i < names.length; i++) {
          var it = new Item();
          it.name = names[i];
          it.data = seriesData[i];
          it.yAxisIndex=i;
          Series.push(it); // 将item放在series中
        }
        // console.log(Series);
        option.xAxis[0].data = date; // 这一步是设置X轴数据了，需要注意：option.xAxis.data = json.xcontent这样不行
        // 折线图可设置上下两个X轴，所以必须是option.xAxis[0].data = json.xcontent
        option.legend.data = legends; // 设置图例
        option.series = Series; // 设置图表
        myChart.setOption(option); // 重新加载图表
      });
    },
    //表格数据
    getTable() {
      let result = get(
        "rest/web/auth/homepage/promote_unit?plan_id=" + this.$route.params.id+"&skip=0&take=10"
      );
      result.then(res => {
        this.data = res.data.list;
      });
    }
  },
  mounted() {
    this.drawLine();
    this.getTable();
     //console.log(this.data)
  }
};
</script>

<style>
.deer .td-name-1 {
  position: relative;
}
.deer .td-name-1 a {
  display: block;
}
.deer .td-name-1 a u {
  display: inline-block;
  width: 170px;
  font-size: 12px;
  margin-top: 3px;
  margin-left: 64px;
}
.deer .td-name-1 a u span {
  color: #42403c;
}
.deer .td-name-1 a img {
  position: absolute;
  top: 14px;
}
/* .td-status{color:#fa8f23 !important;} */
</style>




