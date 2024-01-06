import axios from 'axios';

const apiRequest = async (url, method, data = null, config) => {
  switch (method) {
  case 'get':
    return axios.get(url, config);
  case 'post':
    return axios.post(url, data, config);
  case 'put':
    return axios.put(url, data, config);
  case 'delete':
    console.log('delete');
    return axios.delete(url, config);
  default:
    return axios.get(url, config);
  }
};

export default apiRequest;
