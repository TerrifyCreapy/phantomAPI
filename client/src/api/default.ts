import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:7000/api/v0.1",
})

export default instance;