import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import TableMain from '@/components/TableMain'
import addProperty from '@/components/addProperty'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/table',
      name: 'Table',
      component: TableMain,
      meta:{
        requireAuth: true
      }
    },
    {
      path: '/addProperty',
      name: 'addProperty',
      component: addProperty,
      meta:{
        requireAuth: true
      }
    }
  ]
})
