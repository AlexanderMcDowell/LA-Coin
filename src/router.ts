import Vue from 'vue'
import { IonicVueRouter } from '@ionic/vue'
import Home from './views/Home.vue'
import Account from './views/Account.vue'

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
      component: () => import('./views/Signup.vue') //TermsConditions
    },
    {
      path: '/termsConditions',
      name: 'termsConditions',
      component: () => import('./views/TermsConditions.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: Account
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
