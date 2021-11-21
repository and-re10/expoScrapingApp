import axios from 'axios'

const authApi = axios.create({
    baseURL: 'https://ba28-2a02-1811-3602-f800-98c0-128a-49dc-1600.ngrok.io/'
});

export default authApi;