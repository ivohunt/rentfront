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
        return axios.get('/orders/all', {
            params: {
                userId: userId
            }
        })
    },

    sendGetCustomerOrdersRequest(orderId) {
        return axios.get('/order/customer', {
            params: {
                orderId: orderId
            }
        });
    },

    getOrderItems(orderId) {
        return axios.get('/order-items',{
            params: {
                orderId: orderId
            }
        });
    }

}
