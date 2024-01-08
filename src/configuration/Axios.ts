import axios, {AxiosInstance} from "axios";
import {BASE_URL} from "../constants/Constants";

const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json",
    },
})

export default apiClient;