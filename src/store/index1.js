import Vue from 'vue'
import Vuex from 'vuex'
// import state from './state'
// import mutations from './mutations'
// import action from './action'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        username: '',  //姓名
        jobnumber: '',  //工号
        password: '',   //密码
        remember:false,   //是否记住密码
        isLogin:'error', //是否登陆

        refresh: 0 // 是否刷新页面
    },
    action:{

    },
    mutations:{
        //第一个参数默认是state 第二个是传递过来的参数
        //登录模块
        login(state,data){
            state.username = data.username;
            state.jobnumber = data.number;
            state.password = data.password;
            state.remember = data.remember;

            //全局vuex 登陆状态
            state.isLogin = window.sessionStorage.getItem('isLogin') || 'error';
        },
        //退出登录
        logout(state,data){
            window.sessionStorage.setItem('isLogin','error');
            state.isLogin = 'error';
        },
        changePassword(state,data){
            if(data.remember=='yes'){
                state.password = data.password;
                try {
                    localStorage.password = data.password;
                } catch (err) {
                    console.log(err);
                }
            }
        }
        // ,
        // refreshChange(state, num){
        //     state.refresh = num
        // }
    }
})
