import axios from 'axios';

//INDIRIZZO del server, da cambiare concordatamente con il server-api
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
    saveToGallery(multiform) {
        return apiClient.post(`/draw`, multiform);
    },
    galleryOptions(data, user) {
        return apiClient.post(`/profile/${user}/gallery/option`, data);
    },
    methods: {
        setToken(token) {
            apiClient.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${token}`;
        }
    }
};
