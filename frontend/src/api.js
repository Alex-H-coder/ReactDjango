//INTERCEPTORS FOR ADDING TOKEN TO REQUEST HEADERS.
import axios from 'axios';
import { ACCESS_TOKEN } from './constants.js';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL  // Use VITE_API_BASE_URL from environment variables the .env file
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN); // Retrieve the token from local storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}` //passing a jwt token
        }
        return config
    },
    (error) => {
        return Promise.reject(error) // Handle request error
    }
)

export default api; // Export the configured axios instancest ACCESS_TOKEN