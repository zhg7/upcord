import axios from 'axios'

export const http = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}api`,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
})