import axios from "axios";
import {start} from "@popperjs/core";

export default {

    sendGetEquipmentSizesRequest(sizeTypeId) {
        return axios.get('/equipment-sizes', {
            params: {
                sizeTypeId: sizeTypeId
            }
        })
    },
}