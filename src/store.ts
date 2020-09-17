import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todayDate: '',
    allUsers: []
  },
  getters: {
    returnTodayDate: state => {
      return state.todayDate
    },
    returnAllUsers: state => {
      return state.allUsers
    }
  }
})
