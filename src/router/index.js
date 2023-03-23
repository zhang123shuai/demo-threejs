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
        title: '1-page'
      },
    }, {
      path: '/2-page',
      name: '2-page',
      component: () => import('@/views/2-page/index.vue'),
      meta: {
        title: '2-page顶点、几何'
      },
    }, {
      path: '/3-page',
      name: '3-page',
      component: () => import('@/views/3-page/index.vue'),
      meta: {
        title: '3-form表单动态验证'
      },
    }, {
      path: '/4-page',
      name: '4-page',
      component: () => import('@/views/4-page/index.vue'),
      meta: {
        title: '4-知识图谱d3'
      },
    }, {
      path: '/5-page',
      name: '5-page',
      component: () => import('@/views/5-page/index.vue'),
      meta: {
        title: '5-知识图谱d3-他人项目'
      },
    }, {
      path: '/6-page',
      name: '6-page',
      component: () => import('@/views/6-page/index.vue'),
      meta: {
        title: '6-知识图谱d3练习'
      },
    }, {
      path: '/7-page',
      name: '7-page',
      component: () => import('@/views/7-page/index.vue'),
      meta: {
        title: '7-知识图谱d3练习'
      },
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
