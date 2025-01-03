import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,  // Bu satırı ekleyin
});

export default axiosInstance;
