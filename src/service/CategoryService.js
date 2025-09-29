import axios from "axios";

export default {

    sendPostAddCategoryRequest(category) {
        return axios.post('/category', category)
    },

    sendGetCategoriesRequest() {
        return axios.get('/categories')
    },



    sendDeleteCategoryRequest(categoryId) {
        return axios.delete('/category', {
            params: {
                categoryId: categoryId
            }
        })
    }

}