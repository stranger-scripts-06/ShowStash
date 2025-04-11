import axios from 'axios';

// Set the base URL of your backend server
const API = axios.create({
  baseURL: 'http://localhost:5000',
});

export default API;
