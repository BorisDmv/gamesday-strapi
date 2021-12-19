import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: `http://localhost:3080/`,
        headers: {
            "Content-type": "application/json"
        }
    })
}