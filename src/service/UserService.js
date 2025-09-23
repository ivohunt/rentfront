import axios from "axios";

export default {

    sendPostUserRegistrationRequest(user) {
        return axios.post('/user', user)
    },

}