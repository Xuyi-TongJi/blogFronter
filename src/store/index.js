import Vue from 'vue'
import Vuex from 'vuex'

// 数据状态管理，子组件更新通知其他对象等功能
Vue.use(Vuex)

// 导出数据状态对象
export default new Vuex.Store({
    state: {
        token: '',
        userInfo: {}
    },
    mutations: {
        // setter and remove
        SET_TOKEN: (state, token) => {
            state.token = token;
            localStorage.setItem("token", token);  // 存储在浏览器中
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo;
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        },
        REMOVE_INFO: (state) => {
            state.token = '';
            state.userInfo = {};
            localStorage.setItem("token", '');
            sessionStorage.setItem("userInfo", '');
        }
    },
    getters: {
        // getter
        getUser: state => {
            return state.userInfo;
        },
        getToken: state => {
            return state.token;
        }
    },
    actions: {

    },
    modules: {

    }
})
