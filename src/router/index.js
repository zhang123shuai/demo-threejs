import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: "1-page",
    children: [{
      path: '/1-page',
      name: '1-page',
      component: () => import('@/views/1-page/index.vue'),
      meta: {
        title: '1-three.js'
      },
    }, {
      path: '/2-page',
      name: '2-page',
      component: () => import('@/views/2-page/index.vue'),
      meta: {
        title: '2-form表单动态验证'
      },
    }, {
      path: '/3-page',
      name: '3-page',
      component: () => import('@/views/3-page/index.vue'),
      meta: {
        title: '3-知识图谱'
      },
    }, {
      path: '/4-page',
      name: '4-page',
      component: () => import('@/views/4-page/index.vue'),
      meta: {
        title: '4-echarts中国地图'
      },
    }, {
      path: '/5-page',
      name: '5-page',
      component: () => import('@/views/5-page/index.vue'),
      meta: {
        title: '5-图片裁剪'
      },
    }, {
      path: '/6-page',
      name: '6-page',
      component: () => import('@/views/6-page/index.vue'),
      meta: {
        title: '6-iframe嵌入项目并传参'
      },
    }, {
      path: '/7-page',
      name: '7-page',
      component: () => import('@/views/7-page/index.vue'),
      meta: {
        title: '7-bigemap案例集合'
      },
    }, {
      path: '/8-page',
      name: '8-page',
      component: () => import('@/views/8-page/index.vue'),
      meta: {
        title: '8-tree树形查询锚点定位'
      },
    }, {
      path: '/9-page',
      name: '9-page',
      component: () => import('@/views/9-page/index.vue'),
      meta: {
        title: '9-语音录入'
      },
    }, {
      path: '/10-page',
      name: '10-page',
      component: () => import('@/views/10-page/index.vue'),
      meta: {
        title: '10-思维导图'
      },
    }, {
      path: '/11-page',
      name: '11-page',
      component: () => import('@/views/11-page/index.vue'),
      meta: {
        title: '11-css'
      },
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
