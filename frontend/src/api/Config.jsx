import axios from "axios";

const baseURL = import.meta.env.API_URL;

console.log(baseURL)

const instance = axios.create({
    baseURL:baseURL,
})

export default instance;