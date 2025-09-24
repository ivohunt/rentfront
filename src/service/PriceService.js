import axios from "axios";

export default {

    sendPostAddCategoryRequest(category){
        return axios.post('/category', category)


},
    sendGetSizeTypesRequest(){
        return axios.get('category/size-types')
    }
}