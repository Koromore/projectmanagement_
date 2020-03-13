import Vue from 'vue'
import Vuex from 'vuex'
// import state from './state'
// import mutations from './mutations'
// import action from './action'

Vue.use(Vuex)
// 项目群ID150  项目部ID93 内容营销部64
export default new Vuex.Store({
  state: {
    // user: {}, // 员工信息
    // user: { userId: 152 }, //员工信息
    // user: { userId: 527, deptId: 91, realName: '付德全' }, //员工信息
    user: { userId: 134, deptId: 150, realName: '成志朋' }, //员工信息
    // user: { userId: 6, deptId: 41, realName: '宋秀' }, //员工信息
    // user: { userId: 266, deptId: 134, realName: '冯永强' }, //员工信息
    // user: { userId: 40, deptId: 134, realName: '桂婷' }, //员工信息
    // user: { userId: 403, deptId: 121, realName: '林成伟' }, //员工信息
    // user: { userId: 579, deptId: 151, realName: '杨菊玲' }, //员工信息
    // user: { userId: 982, deptId: 91, realName: '赵吉' }, //员工信息
    // user: { userId: 4001, deptId: 51, realName: '石杨' }, //员工信息
    // user: { userId: 365, deptId: 117, realName: '杨欢' }, //员工信息
    // user: { userId: 147, deptId: 51, realName: '张倩' }, //员工信息
    token: '', //登录令牌
    userSign: '', //用户信息带参
    isLogin: 'success', //error/success, //是否登陆
    isRouterAlive: true, // 控制页面刷新
    projectListNum: 1,
  },
  action: {

  },
  mutations: {
    // 项目列表我参与/我发起显示
    projectListShow(state, data){
      state.projectListNum = data
    },
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