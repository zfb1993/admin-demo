import {get,post,filePost} from './axios'

const api = {
    userLogin(data){
        return post('/login',data)
    },
    userInfo(data){
        return post('/me',data)
    },
    userLogout(data){
        return post('/logout',data)
    },

    uploadImage(data){
        return filePost('/upload_image',data)
    },
    createArticle(data){
        return post('/article_add',data)
    },
    editArticle(data){
        return post('/article_edit',data)
    },
    deleteArticle(data){
        return post('/article_delete',data)
    },
    getArticles(data){
        return post('/article_list',data)
    },

    createTag(data){
        return post('/tag_add',data)
    },
    getTags(data){
        return post('/tag_list',data)
    },
    editTags(data){
        return post('/tag_edit',data)
    },
    deleteTag(data){
        return post('/tag_delete',data)
    },

    createCategory(data){
        return post('/category_add',data)
    },
    getCategories(data){
        return post('/category_list',data)
    },
    editCategory(data){
        return post('/category_edit',data)
    },
    deleteCategory(data){
        return post('/category_delete',data)
    },

}


export default api
