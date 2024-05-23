import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.VITE_EC2_ADDR + ':8080',
});

export default apiClient;