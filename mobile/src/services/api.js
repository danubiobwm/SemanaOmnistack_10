import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.16:3333',
});

export default api;

// expo 'http://192.168.1.16:3333'
// Android 'http://10.0.2.2:3333'
