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

    },

    sendGetAllOrdersRequest(userId) {
        return axios.get('/all-orders', {
            params: {
                userId: userId
            }
        })
    }
}
