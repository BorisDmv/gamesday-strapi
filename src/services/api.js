import axios from 'axios'
const qs = require("qs");

export default () => {
    return axios.create({
        baseURL: `http://localhost:8082/`,
        paramsSerializer: params => {
            return qs.stringify(params);
        },
        headers: {
            "Content-type": "application/json"
        }
    })
}