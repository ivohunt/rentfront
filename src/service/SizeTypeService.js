import axios from "axios";

export default {
    sendGetSizeTypesRequest() {
        return axios.get('/size-types')
    },

}