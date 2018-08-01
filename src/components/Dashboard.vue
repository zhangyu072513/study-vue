<template>
	<div id="index">
		<ul class="ul-box">
			<li><span>账户余额<i class='fa fa-question-circle'></i></span><b>{{data.account_balance}}元</b></li>
			<li><span>实时扣费<i class='fa fa-question-circle'></i></span><b>{{data.real_time_deduction}}元</b></li>
			<li><span>点击量<i class='fa fa-question-circle'></i></span><b>{{data.click_num}}</b></li>
			<li><span>展现量<i class='fa fa-question-circle'></i></span><b>{{data.display_num}}</b></li>
			<li><span>点击率<i class='fa fa-question-circle'></i></span><b>{{data.click_percent}}%</b></li>
			<li><span>平均点击花费<i class='fa fa-question-circle'></i></span><b>{{data.avg_cost}}元</b></li>
			<li><span>总成交笔数<i class='fa fa-question-circle'></i></span><b>{{data.total_volume}}</b></li>
			<li><span>总成交金额<i class='fa fa-question-circle'></i></span><b>{{data.total_money}}元</b></li>
			<li><span>投入产出比<i class='fa fa-question-circle'></i></span><b>{{data.in_out_percent}}</b></li>
			<li><span>点击转化率<i class='fa fa-question-circle'></i></span><b>{{data.click_conversion_percent}}%</b></li>
		</ul>
		<div style="clear: both;"></div>
		<div class="plan">
			<div class="plan-top">
				<p>
					<s class="a-1" href="#">我的推广计划</s>
					<span>您可以根据不同的推广目的、宝贝类型，添加多个推广计划，让您的推广更有效</span>
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
								<td class="td-name td-blue"><router-link :to="{name:'cell',params:{id:i.plan_id,name:i.name}}">{{i.name}}</router-link></td>
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
				<table id="demo" lay-filter="test"></table>
			</div>
		</div>
	</div>
</template>
<script>
	import { get } from "../api/api";
// import Vue from "vue";
//加载店铺基本数据
// let result = get("rest/web/auth/homepage/overview");
// result
//   .then(res => {
// 		let data = res.data;
// 		console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
// 	});
	export default{
		data(){
			return{
				data:{},
				list:[],
			}
		},
		created(){
			//获取店铺基础数据
			this.overView();
			this.getTable()
		},
		methods:{
			//获取店铺基础数据
			overView(){
				let result = get('rest/web/auth/homepage/overview');
				result
  				.then(res => {
					this.data= res.data;
				})		
			},
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

