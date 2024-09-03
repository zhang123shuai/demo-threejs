import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false

import L from "leaflet"
Vue.use(L)
// import "leaflet-trackplayer"
import "leaflet/dist/leaflet.css"

// import { Feature, Geometry, Layer, TiledMapLayer } from "../public/static/superMap/iclient-leaflet-es6.min.js"
import TiledMapLayer from "../public/static/superMap/iclient-leaflet-es6.min.js"
Vue.use(TiledMapLayer)

import Feature from "../public/static/superMap/iclient-leaflet-es6.min.js"
Vue.use(Feature)

import Geometry from "../public/static/superMap/iclient-leaflet-es6.min.js"
Vue.use(Geometry)

import Layer from "../public/static/superMap/iclient-leaflet-es6.min.js"
Vue.use(Layer)

import TrackPlayer from "../public/static/superMap/leaflet-trackplayer.umd.cjs"
Vue.use(TrackPlayer)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
