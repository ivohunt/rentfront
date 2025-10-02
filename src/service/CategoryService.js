import axios from "axios";

export default {

    getAvailableCategories(startDate, endDate) {
        return axios.get('/available-categories-with-items', {
            params: {
                startDate: startDate,
                endDate: endDate }
        });
    },


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