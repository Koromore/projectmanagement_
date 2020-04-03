// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/index'
import ElementUI from 'element-ui'
// import 'element-theme-chalk'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import wlGantt from 'wl-gantt'
import "wl-gantt/lib/wl-gantt.css"
import echarts from 'echarts'
import gunter from './components/gante_test/gante'
import {date,date_,time} from '@/utils/date'
import {date0,time0} from '@/utils/time'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(wlGantt)
Vue.use(gunter)
Vue.prototype.$echarts = echarts
Vue.prototype.$date = date
Vue.prototype.$date_ = date_
Vue.prototype.$time = time

Vue.prototype.$date0 = date0
Vue.prototype.$time0 = time0



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})