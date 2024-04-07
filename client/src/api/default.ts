import axios from "axios";

const instance = axios.create({
    baseURL: "http://192.168.1.64:7000/api/v0.1",
    withCredentials: false,
    headers: {
        "Accept": "application/json"
    }
})

export default instance;