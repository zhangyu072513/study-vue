<template>
  <div class="main-content" style="background-color:#fff;">
    <div class="search">
      <el-form :inline="true" :model="form" class="">
        <el-form-item label="操作内容">
          <el-input v-model="form.content" @clear="operationRecord" placeholder="操作内容查询"  class="form-content" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="operationRecord">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="list" :max-height="fullHeight" style="width: 100%">
        <el-table-column prop="create_time" :formatter="dateFormat" label="操作时间" width="180">
        </el-table-column>
        <el-table-column prop="type" label="操作类型" width="130">
        </el-table-column>
        <el-table-column prop="content" label="操作内容">
        </el-table-column>
        <el-table-column prop="reason" label="操作原因" width="400">
        </el-table-column>
        <el-table-column prop="operator" label="操作人账号" width="200">
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next" :total="count">
      </el-pagination>
    </div>
  </div>

</template>
<script>
import moment from "moment";
import { get, post } from "../../../api/api";
export default {
  data() {
    return {
      fullHeight: document.documentElement.clientHeight - 170,
      list: [],
      currentPage: 1,
      pagesize: 20,
      count: 0,
      skip: 0,
      take: 20,
      form: {
        content: ""
      }
    };
  },
  methods: {
    operationRecord() {
      let result = get(
        "rest/web/auth/operation_record/list?skip=" +
          this.skip +
          "&take=" +
          this.take +
          "&content=" +
          this.form.content
      );
      result
        .then(res => {
          this.list = res.data.list;
          this.count = res.data.count;
        })
        .catch(err => console.log(err));
    },
    //时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    // 分页
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(size);
      let result = get(
        "rest/web/auth/operation_record/list?skip=" +
          this.currentPage * this.pagesize +
          "&take=" +
          this.pagesize +
          "&content=" +
          this.form.content
      );
      result
        .then(res => {
          this.list = res.data.list;
          this.count = res.data.count;
        })
        .catch(err => console.log(err));
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage - 1;
      let result = get(
        "rest/web/auth/operation_record/list?skip=" +
          this.currentPage * this.pagesize +
          "&take=" +
          this.pagesize +
          "&content=" +
          this.form.content
      );
      result
        .then(res => {
          this.list = res.data.list;
          this.count = res.data.count;
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight - 200;
        that.fullHeight = window.fullHeight + "px";
      })();
    };
    that.operationRecord();
  },
  watch: {
    fullHeight(val) {
      if (!this.timer) {
        this.fullHeight = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    }
  }
};
</script>
<style>
.el-table td {
  font-size: 13px;
}
.search .el-form-item{width:25%}
.search .form-content{width:350px;}
</style>

