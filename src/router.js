import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:'/tickets'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import( './components/Login.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import( './components/Signup.vue')
    },
    {
      path: '/tickets',
      name: 'Tickets',
      component: () => import( './components/Tickets.vue')
    }
  ]
})
