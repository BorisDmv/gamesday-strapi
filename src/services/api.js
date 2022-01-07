import axios from 'axios'
const qs = require("qs");

export default () => {
    return axios.create({
        baseURL: `http://localhost:1337/`,
        paramsSerializer: params => {
            return qs.stringify(params);
        },
        headers: {
            "Content-type": "application/json"
        }
    })
}