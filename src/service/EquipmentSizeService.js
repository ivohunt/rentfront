import axios from "axios";
import {start} from "@popperjs/core";

export default {

    getAvailableItems(sizeTypeId) {
        return axios.get('/equipment-sizes', {
            params: {
                sizeTypeId: sizeTypeId
            }
        })
    },
}