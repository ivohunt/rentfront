import axios from "axios";

export default {

    createOrder(order) {
        return axios.post(`/order`, order);
    },


    finalizeOrder(orderId, orderData) {
        return axios.put(`/orders/${orderId}`, orderData);
    },

    addItemToOrder(orderItemDto) {
        return axios.post('/order-items', orderItemDto);
    },

    getOrdersByUser(userId) {
        return axios.get(`/orders`, {
            params: {userId}
        });
    },

    deleteOrder(orderId) {
        return axios.delete(`/orders/${orderId}`);
    },


    sendGetOrdersRequest(userId) {
        return axios.get('/order-history', {
            params: {
                userId: userId
            }
        })
    },

    getOpenOrder(userId) {
        return axios.get('/order/open', {
            params: {
                userId: userId
            }
        })
    }
}