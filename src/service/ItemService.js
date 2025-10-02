import axios from "axios";

export default {
    sendPostAddItem(item) {
        return axios.post('/item', item)
    },
}