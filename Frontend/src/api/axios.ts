import axios from 'axios'
import {getAccessToken} from './authtoken'
export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type" : "application/json"
    }
})

api.interceptors.request.use(
    async (config)=>{
    const token = await getAccessToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
},(error) => Promise.reject(error)
)

