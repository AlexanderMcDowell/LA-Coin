import Vue from 'vue'
import { IonicVueRouter } from '@ionic/vue'
import Home from './views/Home.vue'

Vue.use(IonicVueRouter)

export default new IonicVueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/Signup.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('./views/Account.vue')
    },
    {
      path: '/people',
      name: 'people',
      component: () => import('./views/People.vue')
    },
    {
      path: '/profile/:person',
      name: 'profile',
      component: () => import('./views/Profile.vue')
    },
    {path: '/events',
      name: 'events',
      component: () => import('./views/Events.vue')
    },
    {path: '/editprofile',
      name: 'editprofile',
      component: () => import('./views/EditProfile.vue')
    }
  ]
})
