import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import store from '../store/index'
import Login from '@/pages/login/login'
import Home from '@/pages/home/home'
import Gantti from '@/pages/gantti/gantti'
import Problem from '@/pages/problem/problem'

Vue.prototype.$axios = axios;
Vue.use(Router)

// 请求超时时间
axios.defaults.timeout = 10000;

// axios.defaults.baseURL = process.env.API_ROOT;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    if (config.url.indexOf('http://pms.guoxinad.com.cn') == -1) {
      const token = store.state.token;
      const userSign = store.state.userSign;
      token && (config.headers.token = token);
      userSign && (config.headers.userSign = userSign);
    }
    // console.log(config)

    return config;
  },
  error => {
    return Promise.error(error);
  })

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // console.log(response)  
    // console.log(response.headers.status)   

    if (response.status === 200) {
      if (response.data.errcode == 401 || response.data.errcode == 402) {
        console.log('错误')
        store.commit('clearToken', null)
      } else {
        return Promise.resolve(response);
      }
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况    
  error => {
    console.log(error)
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          // // 清除token                  
          store.commit('clearToken', null)
          console.log('401token过期清除token')
          break;
        default:

      }
      return Promise.reject(error.response);
    }
  }
);

const router = new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    redirect: '/login',
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/home/components/project',
    component: resolve => require(['@/pages/home/home'], resolve),
    meta: {
      requireAuth: true,
    },
    children: [{
      path: '/home/components/statistics',
      name: 'statistics',
      component: resolve => require(['@/pages/home/components/statistics'], resolve),
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/home/components/project',
      name: 'project',
      component: resolve => require(['@/pages/home/components/project'], resolve),
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/home/components/task',
      name: 'task',
      component: resolve => require(['@/pages/home/components/task'], resolve),
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/home/components/document',
      name: 'document',
      component: resolve => require(['@/pages/home/components/document'], resolve),
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/home/components/set',
      name: 'set',
      component: resolve => require(['@/pages/home/components/set'], resolve),
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/home/components/project_details',
      name: 'project_details',
      component: resolve => require(['@/pages/home/components/project_details'], resolve),
      meta: {
        requireAuth: true,
      }
    }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    name: "lost",
    component: Login
  },
  {
    path: '/gantti',
    name: "gantti",
    component: Gantti
  },
  {
    path: '/problem',
    name: "problem",
    component: Problem
  }
  ]
})
// TaskDetail
// 页面刷新时，重新赋值 更新vuex内部值
try {
  if (window.sessionStorage.getItem('isLogin') == 'success') {
    var user = JSON.parse(localStorage.getItem('user'));
    let token = localStorage.getItem('token');
    let userSign = localStorage.getItem('userSign');
    store.commit('login', { token, user, userSign });
  }
} catch (e) {

}

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.isLogin == 'success') {
      console.log('%c login success!', 'color:red;background:yellow')
      next();
    } else {
      console.log('%c please login!', 'color:blue;background:yellow')
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next();
  }
})

export default router;