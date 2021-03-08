import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TagList from '../views/tags/list.vue'

Vue.use(VueRouter)

/**
 * 辅助页面，不出现在菜单中
 * 比如404页面，3级编辑页面等等
 */
export const HelpRoutes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/login',
        name: '登录',
        component: resolve => require(['../views/login/Login.vue'],resolve)
    },
];

export const routes = [
    {
        path: '/',
        name: '标签管理',
        component:resolve => require(['../views/Layout.vue'],resolve),
        children:[
            {
                // name: '首页',
                icon:"md-home",
                path: 'index',
                component: Home,
            },
            {
                name: '标签列表',
                icon:"ios-bookmark",
                path: 'tagList',
                component: TagList,
            },
        ],
    },
]

export const router = new VueRouter({
    routes:[...HelpRoutes,...routes],
})

