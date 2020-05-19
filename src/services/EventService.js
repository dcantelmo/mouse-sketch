import axios from 'axios';

const baseURL = 'http://localhost:3000';

const apiClient = axios.create({
    baseURL: baseURL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000
});

export default {
    baseURL,
    getImagesURL(user) {
        return apiClient.get(`/profile/${user}/gallery`);
    },
    register(credentials) {
        return apiClient.post(`/register`, credentials);
    },
    login(credentials) {
        return apiClient.post(`/login`, credentials);
    },
    getUserProfile(user) {
        return apiClient.get(`/profile/${user}`);
    },
    methods: {
        setToken(token) {
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${token}`;
        }
    }
};
