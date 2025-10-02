import axios from "axios";

export default {

    sendPatchOrderRequest(orderId, status) {
        return axios.patch('/order', {
            params: {
                orderId: orderId,
                status: status
            }
        })
    },

    sendGetAllOrdersRequest(status) {
        return axios.get('/orders/all', {
            params: {
                status: status
            }
        });
    },

    sendPostOrderRequest(order) {
        return axios.post('/order', order);
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
    },

    getExistingOrder(orderId) {
        return axios.get('/order/existing', {
            params: {
                orderId: orderId
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
        return axios.get('/order-items', {
            params: {
                orderId: orderId
            }
        });
    }
}