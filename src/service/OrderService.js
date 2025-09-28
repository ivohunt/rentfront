import axios from "axios";

export default {
    sendOrderDatesRequest(userId) {
        return axios.post('/order', userId)
    },

}