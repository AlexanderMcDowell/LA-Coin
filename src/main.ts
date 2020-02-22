import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Ionic from '@ionic/vue'
import '@ionic/core/css/ionic.bundle.css'
//import VuePageTransition from '../node_modules/vue-page-transition'

//Vue.use(VuePageTransition)

import firebase from './firebase.config'
Object.defineProperty(Vue.prototype, '$firebase', { value: firebase });

Vue.use(Ionic)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
