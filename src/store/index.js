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


            // try {
            //     //判断用户是否勾选了记住账号信息
            //     if(data.remember==='yes'){
            //         console.log('需要存储登录信息')
            //         localStorage.username = data.username;
            //         localStorage.jobnumber = data.number;
            //         localStorage.password = data.password;
            //         localStorage.remember = data.remember;
            //     }else{
            //         console.log('不需要存储登录信息')
            //         //清空 localStorage 的值
            //         localStorage.removeItem('username');
            //         localStorage.removeItem('jobnumber');
            //         localStorage.removeItem('password');
            //         localStorage.removeItem('remember');
            //     }
            // } catch (err) {
            //     console.log(err);
            // }
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
    }
})
