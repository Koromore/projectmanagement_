import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import store from '../store/index'
import Login from '@/pages/login/login'
import Home from '@/pages/home/home'
import Gantti from '@/pages/gantti/gantti'
import ProjectDetails from '@/components/project_details'


Vue.prototype.$axios = axios;
Vue.use(Router)

const router = new Router({
	// mode: 'history',
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
			meta: {
				requireAuth: true,
			}
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
			path: '/project_details',
			name: "project_details",
			component: ProjectDetails
		}
	]
})

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
