import axios from 'axios';

const api = axios.create({
  baseURL: process.env.GATSBY_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Version': '1.0.0',
  },
});

export default api;
