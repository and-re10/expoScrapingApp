import axios from 'axios'

const authApi = axios.create({
    baseURL: 'https://5f1d-2a02-1811-3602-f800-6981-39a6-b2b6-c50e.ngrok.io/'
});

export default authApi;