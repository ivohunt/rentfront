import axios from "axios";

export default {

    sendGetOrdersRequest(selectedUserId) {
return axios.get('/order-history', {
    params: {
        userId: selectedUserId
    }

})
    }
}