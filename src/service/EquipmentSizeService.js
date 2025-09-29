import axios from "axios";

export default {

    sendGetEquipmentSizesRequest() {
        return axios.get('/equipment-sizes')
    },
}