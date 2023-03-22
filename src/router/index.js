import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect:"1-page",
    children: [{
      path: '/1-page',
      name: '1-page',
      component: () => import('@/views/1-page/index.vue'),
      meta: {
        title: '1-page'
      },
    },{
      path: '/2-page',
      name: '2-page',
      component: () => import('@/views/2-page/index.vue'),
      meta: {
        title: '2-page顶点、几何'
      },
    },{
      path: '/3-page',
      name: '3-page',
      component: () => import('@/views/3-page/index.vue'),
      meta: {
        title: '3-page-form表单动态验证'
      },
    },{
      path: '/4-page',
      name: '4-page',
      component: () => import('@/views/4-page/index.vue'),
      meta: {
        title: '4-page知识图谱d3'
      },
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
