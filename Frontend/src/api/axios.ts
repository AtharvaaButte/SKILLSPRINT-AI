import axios from 'axios'
import {getAccessToken} from './authtoken'

export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
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

