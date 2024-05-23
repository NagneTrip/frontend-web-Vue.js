import axios from 'axios';

const apiClient = axios.create({
  // baseURL: 'http://ec2-54-79-199-126.ap-southeast-2.compute.amazonaws.com:8080',
  baseURL: 'http://localhost:8080',
});

export default apiClient;