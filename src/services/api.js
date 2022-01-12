import axios from 'axios'
const qs = require("qs");

export default () => {
    return axios.create({
        baseURL: `${process.env.VUE_APP_BASE_URL}`,
        paramsSerializer: params => {
            return qs.stringify(params);
        },
        headers: {
            "Content-type": "application/json"
        }
    })
}