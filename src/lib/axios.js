import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3610/v1',
});

client.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default client;
