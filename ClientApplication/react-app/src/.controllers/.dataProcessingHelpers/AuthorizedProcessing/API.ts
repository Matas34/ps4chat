import axios from 'axios';
import UserManager from './tokenManager';

const API = axios.create({
    baseURL:  process.env.REACT_APP_API_URL,
});

API.interceptors.request.use(config => {
    const token = UserManager.getUser()?.token;
    if (token !== null) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default API;
