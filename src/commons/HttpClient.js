import axios from 'axios';

export default axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://localhost:7258/api/' : 'https://localhost:7258/api/'
})