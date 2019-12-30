import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: window.localStorage.getItem('user') == null ? '':JSON.parse(window.localStorage.getItem('user')).username
    },
    token: window.localStorage.getItem('token') == null ? '':JSON.parse(window.localStorage.getItem('token'))
  },
  mutations: {
    //获取用户名
    GET_USER: (state,data) =>{
      //把用户名存起来
      state.user = data
      window.localStorage.setItem('user',data)
    },
    //获取用户token
    USER_TOKEN: (state,data) => {
      //把用户token存起来
      state.token = data
      window.localStorage.setItem('token',data)
    }
  }
})
