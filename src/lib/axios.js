import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3610/v1',
});

client.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error?.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export const setAuthorizationToken = (token) => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default client;
