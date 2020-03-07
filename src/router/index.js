import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import store from '../store/index'
import Login from '@/pages/login/login'
import Home from '@/pages/home/home'
import Gantti from '@/pages/gantti/gantti'
import TaskDetail from '@/pages/template/taskDetail'

Vue.prototype.$axios = axios;
Vue.use(Router)

const router = new Router({
	mode: 'hash',
	routes: [
		{
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
			redirect: '/home/components/statistics',
			component: resolve => require(['@/pages/home/home'], resolve),
			meta: {
				requireAuth: true,
			},
			children: [
				{
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
			path: '/taskDetail',
			name: "taskDetail",
			component: TaskDetail
		}
	]
})
// TaskDetail
// 页面刷新时，重新赋值 更新vuex内部值
try {
	if (window.localStorage.getItem('username')) {

		let userInfo = {
			username: localStorage.getItem('username'),
			number: localStorage.getItem('jobnumber'),
			password: localStorage.getItem('password'),
			remember: localStorage.getItem('remember')
		}
		store.commit('login', userInfo)
	}
} catch (e) {

}

router.beforeEach((to, from, next) => {
	if (to.matched.some(r => r.meta.requireAuth)) {
		if (store.state.isLogin == 'success') {
			console.log('%c login success!', 'color:red;background:yellow')
			next();
		}
		else {
			console.log('%c please login!', 'color:blue;background:yellow')
			next({
				// path: '/login',
				// query: {redirect: to.fullPath}
			})
		}
	}
	else {
		next();
	}
})

export default router;
