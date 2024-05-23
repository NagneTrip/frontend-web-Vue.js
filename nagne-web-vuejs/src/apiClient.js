import axios from 'axios';

const apiClient = axios.create({
  baseURL: ':8080',
});

export default apiClient;