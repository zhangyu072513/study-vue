<template>
  <div class="main-content" style="background-color:#fff;">
    <div>
      <div id="title">
        <ul>
          <li class="img">
            <img :src="this.$route.params.imgurl" />
          </li>
          <li class="context">
            <p>
              <span>宝贝名称：</span>
              <a href="#">{{this.$route.params.name}}</a>
            </p>
            <p class="cp">
              <span>价格：</span>
              <i>{{this.$route.params.price}}</i>元</p>
          </li>
        </ul>
      </div>
      <!-- 图表 -->
      <div id="chart-baby" style="width:99%;height:350px;margin-top:20px;"></div>
      <div class="plan">
        <div class="plan-top">
          <p class="p-title">
            <a class="a-1" href="#">关键词推广</a>
            <a href="">定向推广</a>
          </p>
          <p class="p-1">
            <button>
              <i class="fa fa-plus"></i>添加关键词</button>
            <!-- <button>
                          <i class="fa fa-plus"></i>店铺推广</button> -->
          </p>
        </div>
        <div class="plan-table">
          <!-- <el-button-group>
            <el-button :class="{}" @click="getClass(1)" value="1">汇总</el-button>
            <el-button :class="{}" @click="getClass(2)" value="2">计算机</el-button>
            <el-button :class="{}" @click="getClass(3)" value="3">移动设备</el-button>
          </el-button-group> -->
          <ul class="device">
            <li v-for="(todo, index) in todos" v-on:click="getClass(todo.value);addClass(index)" v-bind:class="{ active:index==current}">
              {{ todo.text }}
            </li>
          </ul>
          <!-- <div style="clear:both"></div> -->
          <p class="span-td left" style="margin-top:25px;margin-left:15px">
            <span class="core1"></span> 核心
            <span class="optimization1"></span> 优化
            <span class="key_point1"></span> 重点
          </p>
          <el-button style="margin-top:15px;margin-left:20px;background-color: #fe8405;color:#fff" @click="dialogFormBatchVisible = true;">批量调价</el-button>
          <el-dropdown trigger="hover" class="right">
            <span class="el-dropdown-link el-icon-date down-span">
              {{timeDate.content}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="getTime(timeDate.today,timeDate.today,'今天')">今天</el-dropdown-item>
              <el-dropdown-item @click.native="getTime(timeDate.yesterday,timeDate.yesterday,'昨天')">昨天</el-dropdown-item>
              <el-dropdown-item @click.native="getTime(timeDate.pastday_3,timeDate.yesterday,'过去3天')">过去3天</el-dropdown-item>
              <el-dropdown-item @click.native="getTime(timeDate.pastday_7,timeDate.yesterday,'过去7天')">过去7天</el-dropdown-item>
              <el-dropdown-item @click.native="getTime(timeDate.pastday_14,timeDate.yesterday,'过去14天')">过去14天</el-dropdown-item>
              <el-dropdown-item @click.native="getTime(timeDate.pastday_30,timeDate.yesterday,'过去30天')">过去30天</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>                  
          <el-table :data="data" style="width:100%" class="layui-table"  @selection-change="getSelectedIds" lay-skin="line" lay-even max-height="700" :default-sort="{prop:[]}">
            <el-table-column type="selection" width="45" show-overflow-tooltip prop="keyword_id">
            </el-table-column>
            <el-table-column label="状态" width="75">
              <template slot-scope="scope">
                <i class="td-status-1">{{scope.row.status}}</i>
                <el-tooltip effect="dark" placement="right" v-show="!scope.row.warning_tag==0">
                  <div slot="content">{{scope.row.warning_msg}}</div>
                  <i class="el-icon-warning" style="color:#f8625a"></i>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="全部" width="82">
              <template slot-scope="scope">
                <div class="span-td">
                  <span v-bind:class="setClass1(scope.row.core)"></span>
                  <span v-bind:class="setClass2(scope.row.optimization)"></span>
                  <span v-bind:class="setClass3(scope.row.key_point)"></span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="关键词" width="180">
              <template slot-scope="scope">
                <el-button type="text" :data-id="scope.row.keyword_id" @click="centerDialogVisible=true;" ref="keyword">
                  {{scope.row.name}}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="computer_money" v-if="form.device==1||form.device==2" sortable label="计算机出价" width="130">
            </el-table-column>
            <el-table-column prop="mobile_money" v-if="form.device==1||form.device==3" sortable label="移动出价" width="130">
            </el-table-column>
            <el-table-column prop="display_num" label="展现量" sortable width="100">
            </el-table-column>
            <el-table-column prop="click_num" label="点击量" sortable>
            </el-table-column>
            <el-table-column prop="click_percent" :formatter="formateer_1" label="点击率" sortable>
            </el-table-column>
            <el-table-column prop="cost" label="花费" sortable>
            </el-table-column>
            <el-table-column prop="in_out_percent" label="投入产出比" sortable width="130">
            </el-table-column>
            <el-table-column prop="total_volume" label="总成交笔数" sortable width="130">
            </el-table-column>
            <el-table-column prop="total_money" label="总成交金额" sortable width="130">
            </el-table-column>
            <el-table-column prop="click_conv_percent" :formatter="formateer_2" label="点击转化率" sortable width="130">
            </el-table-column>
            <el-table-column label="调价操作" width="150">
              <template slot-scope="scope">
                <el-button v-if="form.device_1==1||form.device_1==2" :class="{'setprice':scope.row.assessment_cycle_computer}" size="mini" :data-id="scope.row.keyword_id" :data-num="scope.$index" @click="dialogFormVisible = true;getKey(scope.row.keyword_id);getKeyword(2);getCell(scope.$index, scope.row,scope.column,'pc')">pc</el-button>
                <el-button v-if="form.device_1==1||form.device_1==3" :class="{'setprice':scope.row.assessment_cycle_mobile}" size="mini" :data-id="scope.row.keyword_id" :data-num="scope.$index" @click="dialogFormVisible = true;getKey(scope.row.keyword_id);getKeyword(3);getCell(scope.$index, scope.row,scope.column,'移动')">移动</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 关键词调价弹窗 -->
        <el-dialog title="设置调价规则" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <!-- <el-input class="keyId" v-model="form.keyword_id_list"></el-input> -->
            <!-- <el-form-item label="设备类型" :label-width="formLabelWidth">
              <el-select class="my_select" @change="getKeyword()" v-model="form.device_1" placeholder="计算机/移动设备">
                <el-option label="全部" value="1"></el-option>
                <el-option label="计算机" value="2"></el-option>
                <el-option label="移动设备" value="3"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="考核周期" class="radio-1" :label-width="formLabelWidth">

              <el-radio-group v-model="form.assessment_cycle">
                <el-radio label="4h" border size="medium">4小时</el-radio>
                <el-radio label="3d" border size="medium">3天</el-radio>
                <el-radio label="7d" border size="medium">7天</el-radio>
                <el-radio label="14d" border size="medium">14天</el-radio>
                <el-radio label="30d" border size="medium">30天</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="基础点击量" :label-width="formLabelWidth">
              <el-input v-model.number="form.expected_click_num" placeholder="请填写点击数量">
              </el-input>
            </el-form-item>
            <el-form-item label="点击转化率" :label-width="formLabelWidth">
              <el-input v-model.number="form.click_conv_percent_conf" placeholder="百分比数据，如55%则填55，范围1~99">
              </el-input>
            </el-form-item>
            <el-form-item label="调价幅度" :label-width="formLabelWidth">
              <el-input v-model.number="form.adjust_price" placeholder="百分比数，如10%则写10">
              </el-input>
            </el-form-item>
            <el-form-item label="投入产出比" :label-width="formLabelWidth">
              <el-col :span="11">
                <el-input placeholder="0" v-model.number="form.roi_low_conf"></el-input>
              </el-col>
              <el-col class="line line-2" :span="2">-</el-col>
              <el-col :span="11">
                <el-input placeholder="100" v-model.number="form.roi_high_conf"></el-input>
              </el-col>
            </el-form-item>
          </el-form>
          <div style="clear:both"></div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="warning" @click="dialogFormVisible = true">清 除</el-button>
            <el-button type="danger" @click="pausePrice()">暂 停</el-button>
            <el-button type="primary" @click="dialogFormVisible = false;setPrice()">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 关键词批量调价弹窗 -->
        <el-dialog title="设置批量调价规则" :visible.sync="dialogFormBatchVisible">
          <el-form :model="form">
            <!-- <el-input class="keyId" v-model="form.keyword_id_list"></el-input> -->
            <el-form-item label="设备类型" :label-width="formLabelWidth">
              <el-select class="my_select" @change="getKeyword()" v-model="formBatch.device" placeholder="全部/计算机/移动设备">
                <el-option label="全部" value="1"></el-option>
                <el-option label="计算机" value="2"></el-option>
                <el-option label="移动设备" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="考核周期" class="radio-1" :label-width="formLabelWidth">
              <el-radio-group v-model="formBatch.assessment_cycle">
                <el-radio label="4h" border size="medium">4小时</el-radio>
                <el-radio label="3d" border size="medium">3天</el-radio>
                <el-radio label="7d" border size="medium">7天</el-radio>
                <el-radio label="14d" border size="medium">14天</el-radio>
                <el-radio label="30d" border size="medium">30天</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="基础点击量" :label-width="formLabelWidth">
              <el-input v-model.number="formBatch.expected_click_num" placeholder="请填写点击数量">
              </el-input>
            </el-form-item>
            <el-form-item label="点击转化率" :label-width="formLabelWidth">
              <el-input v-model.number="formBatch.click_conv_percent_conf" placeholder="百分比数据，如55%则填55，范围1~99">
              </el-input>
            </el-form-item>
            <el-form-item label="调价幅度" :label-width="formLabelWidth">
              <el-input v-model.number="formBatch.adjust_price" placeholder="百分比数，如10%则写10">
              </el-input>
            </el-form-item>
            <el-form-item label="投入产出比" :label-width="formLabelWidth">
              <el-col :span="11">
                <el-input placeholder="0" v-model.number="formBatch.roi_low_conf"></el-input>
              </el-col>
              <el-col class="line line-2" :span="2">-</el-col>
              <el-col :span="11">
                <el-input placeholder="100" v-model.number="formBatch.roi_high_conf"></el-input>
              </el-col>
            </el-form-item>
          </el-form>
          <div style="clear:both"></div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormBatchVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormBatchVisible = false;setPriceBatch()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
// import qs from 'qs'
import Vue from "vue";
import { get, post } from "../../../api/api";
import { Message, Loading, Popover } from "element-ui";
// axios.defaults.headers.post['Content-Type'] = 'application/json'
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
      data: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormBatchVisible: false,
      form: {
        keyword_id_list: [],
        device: "",
        assessment_cycle: "",
        expected_click_num: "",
        click_conv_percent_conf: "",
        roi_high_conf: "",
        roi_low_conf: "",
        adjust_price: "",
        device_1: "1",
        status: ""
      },
      formBatch: {
        keyword_id_list: [],
        device: "",
        assessment_cycle: "",
        expected_click_num: "",
        click_conv_percent_conf: "",
        roi_high_conf: "",
        roi_low_conf: "",
        adjust_price: "",
        device_1: "1",
        status: ""
      },
      multipleSelection: [],
      timeDate: {
        today: "",
        yesterday: "",
        pastday_3: "",
        pastday_7: "",
        pastday_14: "",
        pastday_30: "",
        start_time: "",
        end_time: "",
        content: "昨天"
      },
      formLabelWidth: "120px",
      loading: false,
      current: 0,
      todos: [
        { text: "汇总", value: 1 },
        { text: "计算机", value: 2 },
        { text: "移动设备", value: 3 }
      ],
      // 实时更新调价状态
      priceBtn:{
        num:0
      }
      // classTrue_1:false,
      // classTrue_2:false
    };
  },
  methods: {
    //宝贝趋势图
    drawLine() {
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
        "rest/web/auth/promote_unit/trend?unit_id=" + this.$route.params.id
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
        date.reverse(); // 数据倒置
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
          it.yAxisIndex = i;
          Series.push(it); // 将item放在series中
        }
        option.xAxis[0].data = date; // 这一步是设置X轴数据了，需要注意：option.xAxis.data = json.xcontent这样不行
        // 折线图可设置上下两个X轴，所以必须是option.xAxis[0].data = json.xcontent
        option.legend.data = legends; // 设置图例
        option.series = Series; // 设置图表
        myChart.setOption(option); // 重新加载图表
      });
    },
    //获取时间
    getDate() {
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
      var nowTime = new Date();
      nowTime.setDate(nowTime.getDate());
      this.timeDate.today = nowTime.Format("yyyy-MM-dd");
      nowTime = new Date();
      nowTime.setDate(nowTime.getDate() - 1);
      this.timeDate.yesterday = nowTime.Format("yyyy-MM-dd");
      this.timeDate.start_time = nowTime.Format("yyyy-MM-dd");
      this.timeDate.end_time = nowTime.Format("yyyy-MM-dd");
      nowTime = new Date();
      nowTime.setDate(nowTime.getDate() - 3);
      this.timeDate.pastday_3 = nowTime.Format("yyyy-MM-dd");
      nowTime = new Date();
      nowTime.setDate(nowTime.getDate() - 7);
      this.timeDate.pastday_7 = nowTime.Format("yyyy-MM-dd");
      nowTime = new Date();
      nowTime.setDate(nowTime.getDate() - 14);
      this.timeDate.pastday_14 = nowTime.Format("yyyy-MM-dd");
      nowTime = new Date();
      nowTime.setDate(nowTime.getDate() - 30);
      this.timeDate.pastday_30 = nowTime.Format("yyyy-MM-dd");
       console.log(this.timeDate);
    },
    // 时间区域
    getTime(date1, date2, str) {
      this.timeDate.start_time = date1;
      this.timeDate.end_time = date2;
      this.timeDate.content = str;
      // console.log(this.timeDate);
      let result = get(
        "rest/web/auth/keyword/list?unit_id=" +
          this.$route.params.id +
          "&skip=0&take=99" +
          "&device=" +
          this.form.device +
          "&start_time=" +
          this.timeDate.start_time +
          "&end_time=" +
          this.timeDate.end_time
      );
      let loadingInstance = Loading.service({
        lock: true,
        text: "加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".deer")
      });
      result
        .then(res => {
          this.data = res.data.list;
          loadingInstance.close();
        })
        .catch(err => {
          console.log(err);
          loadingInstance.close();
        });
    },
    //设置class名
    setClass1(type) {
      if (type == 1) return "core1";
    },
    setClass2(type) {
      if (type == 1) return "optimization1";
    },
    setClass3(type) {
      if (type == 1) return "key_point1";
    },
    // 获取当前参数
    getKey(keyword_id) {
      this.form.keyword_id_list = [];
      this.form.keyword_id_list.push(keyword_id);
    },
    // 获取批量调价ID
    getSelectedIds(val) {   
      console.log(val);
      this.formBatch.keyword_id_list=[];
      for(var i=0;i<val.length;i++){
         this.formBatch.keyword_id_list.push(val[i].keyword_id);
      }
      console.log(this.formBatch.keyword_id_list)
    },
    // 调价规则传参
    setPrice() {
      let isA = this.classTrue_1;
      let data_1 = {
        keyword_id_list: this.form.keyword_id_list,
        device: Number(this.form.device),
        assessment_cycle: this.form.assessment_cycle,
        expected_click_num: Number(this.form.expected_click_num),
        click_conv_percent_conf: Number(this.form.click_conv_percent_conf),
        roi_high_conf: Number(this.form.roi_high_conf),
        roi_low_conf: Number(this.form.roi_low_conf),
        adjust_price: Number(this.form.adjust_price)
      };
      let self = this;
      post("rest/web/auth/keyword/config/update", data_1).then(function(res) {
        if(self.form.device==1||self.form.device==2){
           Vue.set(self.data[self.priceBtn.num], "assessment_cycle_computer",data_1.assessment_cycle);
        }
        if(self.form.device==1||self.form.device==3){
           Vue.set(self.data[self.priceBtn.num], "assessment_cycle_mobile",data_1.assessment_cycle);
        }
        console.log(self.data[self.priceBtn.num]);
      });
    },
    // 调价批量规则传参
    setPriceBatch() {
      let isA = this.classTrue_1;
      let data_1 = {
        keyword_id_list: this.formBatch.keyword_id_list,
        device: Number(this.formBatch.device),
        assessment_cycle: this.formBatch.assessment_cycle,
        expected_click_num: Number(this.formBatch.expected_click_num),
        click_conv_percent_conf: Number(this.formBatch.click_conv_percent_conf),
        roi_high_conf: Number(this.formBatch.roi_high_conf),
        roi_low_conf: Number(this.formBatch.roi_low_conf),
        adjust_price: Number(this.formBatch.adjust_price)
      };
      let self = this;
      // console.log(data_1);
      post("rest/web/auth/keyword/config/update", data_1).then(function(res) {
        // let code =res.code
        // console.log(self.$route.params.id);
        if(self.form.device==1||self.form.device==2){
           Vue.set(self.data[self.priceBtn.num], "assessment_cycle_computer",data_1.assessment_cycle);
        }
        if(self.form.device==1||self.form.device==3){
           Vue.set(self.data[self.priceBtn.num], "assessment_cycle_mobile",data_1.assessment_cycle);
        }
        // console.log(self.data[self.priceBtn.num]);
      });
    },
    //获取设备
    getClass(value) {
      this.form.device = value;
      this.form.device_1 = value;
      // console.log(this.form.device);
      let result = get(
        "rest/web/auth/keyword/list?unit_id=" +
          this.$route.params.id +
          "&skip=0&take=99" +
          "&device=" +
          this.form.device +
          "&start_time=" +
          this.timeDate.start_time +
          "&end_time=" +
          this.timeDate.end_time
      );
      result
        .then(res => {
          this.data = res.data.list;
          console.log(1);
        })
        .catch(err => console.log(err));
    },
    addClass: function(index) {
      this.current = index;
    },
    //获取关键词配置
    getKeyword(val) {
      this.form.device = val;
      let result = get(
        "rest/web/auth/keyword/config?keyword_id=" + this.form.keyword_id_list
      );
      result
        .then(res => {
          let data = res.data;
          if (val == 2) {
            this.form.assessment_cycle = data.assessment_cycle_computer;
            this.form.expected_click_num = data.expected_click_num_computer;
            this.form.click_conv_percent_conf =
              data.click_conv_percent_conf_computer;
            this.form.roi_high_conf = data.roi_high_conf_computer;
            this.form.roi_low_conf = data.roi_low_conf_computer;
            this.form.adjust_price = data.adjust_price_computer;
          }
          if (val == 3) {
            this.form.assessment_cycle = data.assessment_cycle_mobile;
            this.form.expected_click_num = data.expected_click_num_mobile;
            this.form.click_conv_percent_conf =
              data.click_conv_percent_conf_mobile;
            this.form.roi_high_conf = data.roi_high_conf_mobile;
            this.form.roi_low_conf = data.roi_low_conf_mobile;
            this.form.adjust_price = data.adjust_price_mobile;
          }
        })
        .catch(err => console.log(err));
    },
    // 格式化 表格的值
    formateer_1(row, colum) {
      return Number(row.click_percent * 100).toFixed(2) + "%";
    },
    formateer_2(row, colum) {
      return Number(row.click_conv_percent * 100).toFixed(2) + "%";
    },
    // 获取当前点击的表格的cell
    getCell(index, row, col, str) {
      // console.log(index, row, col, str);
      this.priceBtn.num = index;
      console.log(this.priceBtn.num)
    },
    // 暂停调价
    pausePrice(){

    }
  },
  mounted() {
    //this.getDate();
    this.getDate();
    this.drawLine();
    this.setClass1();
    this.setClass2();
    this.setClass3();
    this.getClass(1);
    // this.getTable(1,this.timeDate.yesterday,this.timeDate.yesterday);
  }
};
</script>

  <style>
.line-2 {
  text-align: center;
}
.deer .td-name-1 {
  position: relative;
}

.deer .td-name-1 a {
  display: block;
}

.deer .td-name-1 a u {
  display: inline-block;
  width: 150px;
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
.span-td span {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #e6e6e6;
  margin-left: 5px;
}
.span-td span.core1 {
  background-color: #a4baf3;
}
.span-td span.optimization1 {
  background-color: #ff877c;
}
.span-td span.key_point1 {
  background-color: #c7e58f;
}

.td-status-1 {
  color: #84aa00;
}
#title {
  margin: 15px 3%;
}
#title ul {
  height: 60px;
}
#title li {
  float: left;
  margin-right: 15px;
}
.context .cp {
  margin-top: 20px;
}
.context a {
  color: #0062e1;
}
.deer .td-name-1 {
  color: #0062e1;
}
#index-plan td {
  height: 50px !important;
}
.el-form-item {
  width: 50%;
  float: left;
}
.my_select {
  width: 100%;
}
.plan-table .el-button-group {
  margin-top: 15px;
}
.active {
  color: #fff;
  background-color: #fe8405;
  border-radius: 3px;
}
.el-form .keyId {
  display: none;
}
.plan-table span.down-span {
  display: inline-block;
  width: 130px;
  height: 40px;
  line-height: 40px;
  margin-top: 15px;
  background-color: #eee;
  padding: 0 5px;
  cursor: pointer;
}
ul.el-dropdown-menu {
  width: 130px;
}
.device {
  border: 1px solid #eee;
  height: 38px;
  float: left;
  border-radius: 5px;
  margin-top: 15px;
  cursor: pointer;
  margin-bottom: 15px;
}
.device li {
  float: left;
  height: 38px;
  line-height: 38px;
  padding: 0 15px;
  font-size: 15px;
  text-align: center;
}
.device li:first-child {
  border-right: 1px solid #ddd;
}
.device li:last-child {
  border-left: 1px solid #ddd;
}
.device li:hover {
  color: #3a8ee6;
  background-color: #ecf5ff;
}
.plan-table table > tbody > tr > td,
.plan-table table > thead > tr > th {
  padding: 0;
}
.el-table .cell,
.el-table th div {
  padding-right: 0;
}
button.setprice {
  background: #5daf34;
  border-color: #5daf34;
  color: #fff;
}
.el-dialog__body .radio-1 {
  width: 100%;
}
</style>


