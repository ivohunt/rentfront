import axios from "axios";

export default {

    sendGetEquipmentSizesRequest(sizeTypeId) {
        return axios.get('/equipment-sizes',{
            params: {
                sizeTypeId: sizeTypeId
            }
        })
    },
}