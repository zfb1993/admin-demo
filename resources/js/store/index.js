import Vue from 'vue'
import Vuex from 'vuex'
import api from '../axios/http'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        Tags:null,
        Categories:null,
        ArticleList:null,
        UserInfo: {
            name:''
        },
    },
    mutations: {
        SetArticleList(state, list){
            state.ArticleList = list
        },
        SetUserInfo(state,userInfo) {
            state.UserInfo = userInfo
        },
        Logout(state){
            state.Tags = null
            state.Categories = null
            state.ArticleList = null
            state.UserInfo = {
                name:''
            }
        }
    },
    actions: {
        AcInit({dispatch, state, commit}) {
            if (!state.Tags){
                api.getTags().then(res=>{
                    state.Tags = res.data
                })
            }
            if (!state.Categories){
                api.getCategories().then(res=>{
                    state.Categories = res.data
                })
            }
            if (!state.UserInfo.name){
                api.userInfo().then(res=>{
                    state.UserInfo = res.data
                })
            }
        }
    },
    modules: {
    }
})
