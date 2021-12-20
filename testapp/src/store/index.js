import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
// import Cookies from 'js-cookie'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: { 
    currentUser: null,
    isDelay: true,
    list: []
  },
  mutations: { 
    serCurrentUser(state, username) {
      console.log('current is ' + username)
      state.currentUser = username
    },
    changeAuthState(state, isHidden) {
      state.isDelay = isHidden
    },
    changeProjectListItemList(state, list) {
      state.list = list
    }
  },
  actions: {
    async setCurrentUser({ commit }, info) {
      const data = await axios.post("http://localhost:3000/login", info)
    
      if(data.data.username) {
        commit('changeAuthState', false)
        return data.data.username
      }
    },
    async postUserProject({ commit }, projectInfo) {
      console.log(`project id is ${projectInfo.projectId}`)
      const data = await axios.post(`http://localhost:3000/projects/${projectInfo.username}`, projectInfo)

      if(data.data.length) {
        commit('changeProjectListItemList', data.data)
        return data.data
      }
    },
    async deleteSpecifiedProject({ commit }, { clientId, username }) {
      const data = await axios.delete(`http://localhost:3000/projects/${clientId}/${username}`)
      commit('changeProjectListItemList', data.data)
      return data.data
    },
    async createNewAccount({ commit }, info) {
      const data = await axios.post(`http://localhost:3000/register`, info)
      if(data.status == 200) {
        commit('changeAuthState', false)
        commit('setCurrentUser', info.username)
        return info.username
      }
    }
  },
  getters: {
    authState: state => state.isDelay,
    getCurrentUser: state => state.currentUser,
    getProjectList: state => state.list
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage
    })
  ]
});

export default store
