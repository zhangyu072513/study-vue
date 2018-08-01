<template>
  <div class="main-content" style="background-color:#fff;">
    <div>
      <h3>批量推广计划</h3>
      <div class="plan">
        <div class="plan-top">
          <p class="p-title">
            <a class="a-1" href="#">标准推广计划</a>
            <a href="#">关键词列表</a>
          </p>
          <p class="p-1">
            <button>
              <i class="fa fa-plus"></i>新建推广计划</button>
            <button>
              <i class="fa fa-plus"></i>新建批量推广计划</button>
          </p>
        </div>
        <div class="plan-table">
          <table class="layui-table" lay-skin="line" lay-even>
            <thead>
              <tr>
                <th>状态</th>
                <th>推广计划名称</th>
                <th>计划类型</th>
                <th>分时折扣</th>
                <th>日限额</th>
                <th>投放平台</th>
                <th>展现量</th>
                <th>点击量</th>
                <th>点击率</th>
                <th>花费</th>
                <th>投入产出比</th>
                <th>点击转化率</th>
              </tr>
            </thead>
            <tbody id="index-plan">
              <tr v-for="i in list">
                <td class='td-status'>{{i.status}}</td>
                <td class="td-name td-blue">
                  <router-link :to="{name:'cell',params:{id:i.plan_id,name:i.name}}">{{i.name}}</router-link>
                </td>
                <td>{{i.type}}</td>
                <td class='td-blue'>{{i.time_discount}}%</td>
                <td class='td-blue'>{{i.day_limit}}元</td>
                <td class='td-blue'>{{i.platform}}</td>
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
	export default{
		data(){
			return{
				list:[],
			}
		},
		created(){
			this.getTable()
		},
		methods:{
			//获取店铺基础数据
			//获取表格数据
			getTable(){
				let result = get('rest/web/auth/homepage/promote_plan');
				result
  				.then(res => {
					this.list= res.data;
				})
			}
		}
	}
</script>
