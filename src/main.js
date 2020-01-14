// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//引入IVIEW
import iView from  'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)
//引入vue-easytable
import 'vue-easytable/libs/themes-base/index.css'
import {VTable,VPagination} from 'vue-easytable'
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
//引入axios
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
//创建axios实例
var instance = axios.create({timeout: 1000*12})
//设置post请求头
axios.defaults.baseURL = "http://127.0.0.1:8090/";
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = store.state.token;
    token && (config.headers.common['token'] = token);
    return config;
  },
  error => Promise.error(error))
//在请求头中携带token
axios.defaults.headers.common['token'] = store.state.token


router.beforeEach((to,from,next) => {
  if(to.meta.requireAuth){
    if(store.state.token){
      next()
    }else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  }else{
    next()
  }
}
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
