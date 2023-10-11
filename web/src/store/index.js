import { createStore } from 'vuex'
// import createPersistedState from "vuex-persistedstate"
export default createStore({
  state: {
    //用户信息
    userInfo:{}
  },
  getters: {
  },
  mutations: {
    //更新用户信息
      setUserInfo(state,value){
          const user = state.userInfo = {
              ...state.userInfo,
              ...value
          }
          localStorage.setItem("userInfo",user)
   },
    //删除用户信息
    removeUserInfo(state){
          state.userInfo = {}
          localStorage.removeItem("userInfo")
    }
  },
  actions: {
  },
  modules: {
  },
  // plugins:[createPersistedState({paths:["userInfo"]})]
})
