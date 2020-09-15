import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todayDate: '',
    hasStartedSignupProcess: false
  },
  mutations: {
    trueify(state) {
      state.hasStartedSignupProcess = true
    }
  },
  getters: {
    returnTodayDate: state => {
      return state.todayDate
    },
    returnIfStartedSignupProcess: state => {
      return state.hasStartedSignupProcess
    }
  }
})
