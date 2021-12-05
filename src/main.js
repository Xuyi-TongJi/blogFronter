import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import axios from 'axios'
import "./axios.js"
import mavonEditor from 'mavon-editor'
import "./permission"

import "element-ui/lib/theme-chalk/index.css"
import "mavon-editor/dist/css/index.css"

// 程序入口main.js
Vue.config.productionTip = false
Vue.prototype.$axios = axios // 全局使用axios

Vue.use(Element) // 全局使用element-ui
Vue.use(mavonEditor)

new Vue({
  router,  // 在App中配置router和store
  store,
  render: h => h(App),
}).$mount('#app') // 渲染App到index.html中的<div id='app'><div>
