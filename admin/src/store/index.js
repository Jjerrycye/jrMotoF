import { createStore } from 'vuex'
//vuex对数据进行持久化的第三方插件
import createPersistedState from "vuex-persistedstate"
export default createStore({
  state: {
    //保存是否是第一次配置路由的值
    isGetRouter: false,
    //是否折叠侧边栏
    iscollapse: false,
    //保存用户信息
    userInfo: {}
  },
  getters: {
  },
  mutations: {

    changeGetRouter(state, value) {
      state.isGetRouter = value
    },
    //控制侧边栏是否折叠
    changeCollapse(state) {
      state.iscollapse = !state.iscollapse
    },
    //更新userInfo
    updateUserInfo(state, value) {
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    //退出登录清空用户信息
    clearUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  //配置需要持久化的数据
  plugins: [createPersistedState({ paths: ["iscollapse", "userInfo"] })]
})
