/* eslint-disable import/no-duplicates */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'// 引入axios
import Antd from 'ant-design-vue' // 引入ant组件
import 'ant-design-vue/dist/antd.css'
import '@/style/style.scss' // 引入全局样式
Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
