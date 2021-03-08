require('./bootstrap');

import Vue from 'vue'
import {router} from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import api from './axios/http'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)
Vue.use(ViewUI);
Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.component('Home', require('./views/Index.vue').default);

router.beforeEach((to, from, next) => {
    console.log(sessionStorage.getItem('token'),to)
    if (to.meta.title) {
        document.title = to.meta.title
    }
    const path = to.path
    // 只要不是登录的路由都需要先检查token
    if (path !== '/login') {
        if (sessionStorage.getItem('token')) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()  // 确保一定要有next()被调用
    }
})

const app = new Vue({
    el: '#app',
    router,
    store,
});
