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
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
