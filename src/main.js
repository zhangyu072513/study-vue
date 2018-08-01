// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont.css'
import '@/assets/styles/main.scss'
import axios from 'axios'
import moment from 'moment'
// 引用API文件
//import api from './api/api'
// 引入echarts
import echarts from 'echarts'

Vue.config.productionTip = false
// axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts 
// 将API方法绑定到全局
//Vue.prototype.$api = api
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
