import Vue from 'vue'
import Vuex from 'vuex'
// import state from './state'
// import mutations from './mutations'
// import action from './action'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {}, //{ userId: 128, deptId: 64 }, //员工信息
        token: '', //登录令牌
        userSign: '', //用户信息带参
        isLogin: 'error', //'error', //是否登陆
        isRouterAlive: true, // 控制页面刷新
    },
    action: {

    },
    mutations: {
        /**
         * [reload 控制页面刷新]
         */
        beginReload(state) {
            // this.$store.commit('beginReload');

            //         this.$nextTick(()=>{
            //             this.$store.commit('endReload');
            //         })
            state.isRouterAlive = false;
        },
        /**
         * [endReload 恢复页面]
         */
        endReload(state) {
            state.isRouterAlive = true;
        },
        //登录
        login(state, data) {
            state.user = data.user;
            state.token = data.token;
            state.userSign = data.userSign;
            state.isLogin = window.sessionStorage.getItem('isLogin') || 'error';
            localStorage.user = JSON.stringify(data.user);
            localStorage.token = data.token;
            localStorage.userSign = data.userSign;

        },
        /**
         * [clearToken 清除token信息]
         */
        clearToken(state, data) {
            console.log('拦截错误信息,应该跳登录了');
            // window.sessionStorage.setItem('isLogin','error');
            // state.isLogin = 'error';
            // localStorage.removeItem('user');
            // localStorage.removeItem('token');
            // localStorage.removeItem('userSign');
            // window.location.replace('http://guoxin.insun-china.com/hrm');

        },
        //退出登录
        logout(state, data) {
            window.sessionStorage.setItem('isLogin', 'error');
            state.isLogin = 'error';
            //清空 localStorage 的值
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('userSign');
        }
    }
})