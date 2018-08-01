import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import CampaignNorm from '@/components/pages/campaign/norm'
import CampaignBatch from '@/components/pages/campaign/batch'
import Opreration from '@/components/pages/account/operation'
import ReportCar from '@/components/pages/report/car'
import ReportOrt from '@/components/pages/report/orientation'
import CamCell from '@/components/pages/campaign/campaign_cell'
import CamBaby from '@/components/pages/campaign/campaign_baby'
import KeyWord from '@/components/pages/campaign/keyword'

Vue.use(Router)

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

let router = new Router({
// mode: 'history',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/',
      name: '首页',
      component: Home,
      redirect: '/dashboard',
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [
        {path: '/dashboard', component: Dashboard, name: '首页', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '推广计划',
      menuShow: true,
      iconCls: 'iconfont icon-books', // 图标样式class
      children: [
        {path: '/pages/campaign/norm', component: CampaignNorm, name: '标准推广', menuShow: true},
        {path: '/pages/campaign/batch', component: CampaignBatch, name: '批量推广', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '报表',
      menuShow: true,
      iconCls: 'iconfont icon-books',
      children: [
        {path: '/pages/report/car', component: ReportCar, name: '直通车报表', menuShow: true},
        {path: '/pages/report/orientation', component: ReportOrt, name: '定向报表', menuShow: true},
        {path: '/pages/campaign/campaign_cell/:id/:name', component: CamCell, name: 'cell', menuShow: false},
        {path: '/pages/campaign/campaign_baby/:id/:name/:imgurl/:price', component: CamBaby, name: 'baby', menuShow: false},
        {path: '/pages/campaign/keyword/:id', component: KeyWord, name: '关键词列表',menuShow: false}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '账户',
      menuShow: true,
      iconCls: 'iconfont icon-user',
      children: [
        {path: '/pages/account/operation', component: Opreration, name: '操作记录', menuShow: true},
        // {path: '/user/changepwd', component: UserChangePwd, name: '修改密码', menuShow: true}
      ]
    },
    // {
    //   path:'/pages/campaign/campaign_cell/:id',
    //   component:CamCell
    // },
    // {
    //   path:'/pages/campaign/campaign_baby/:id',
    //   component:CamBaby
    // },
    // {
    //   path:'/pages/campaign/keyword/:id',
    //   component:KeyWord
    // }
  ]
})

// router.beforeEach((to, from, next) => {
//   // console.log('to:' + to.path)
//   if (to.path.startsWith('/login')) {
//     window.localStorage.removeItem('access-user')
//     next()
//   } else {
//     let user = JSON.parse(window.localStorage.getItem('access-user'))
//     if (!user) {
//       next({path: '/login'})
//     } else {
//       next()
//     }
//   }
// })

export default router

