import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Add from './views/NewRecipe.vue'
import View from './views/ViewRecipe.vue'
import Edit from './views/EditRecipe.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Search from './views/Search.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },  
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/search/:key',
      name: 'search',
      component: Search
    },
    {
      path: '/view/:id',
      name: 'view',
      component: View
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit
    }
  ],
  scrollBehavior() {
    return {x: 0, y: 0}
  }
})

