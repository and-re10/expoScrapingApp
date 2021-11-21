import axios from 'axios'

const productsApi = axios.create({
    baseURL: 'https://046d-2a02-1811-3602-f800-98c0-128a-49dc-1600.ngrok.io/'
});

export default productsApi;