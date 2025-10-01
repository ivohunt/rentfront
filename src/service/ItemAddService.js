import axios from "axios";

export default {
    sendPostAddItem() {
        return axios.post('/item-add')
    },
}