import axios from "axios";

export default {
    sendOrderDatesRequest(userId) {
        return axios.post('/order', userId)
    },

    sendGetOrdersRequest(userId) {
        return axios.get('/order-history', {
            params: {
                userId: userId
            }
        })
    }
}