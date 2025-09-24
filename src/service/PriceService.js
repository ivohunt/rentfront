import axios from "axios";

export default {

    sendPostAddCategoryRequest(category){
        axios.post('/category',category)
}
}