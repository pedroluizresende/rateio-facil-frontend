import axios from 'axios';

const apiRequest = async (url, method, data = null, config) => {
  try {
    switch (method) {
    case 'get':
      return await axios.get(url, config);
    case 'post':
      return await axios.post(url, data, config);
    case 'put':
      return await axios.put(url, data, config);
    case 'delete':
      return await axios.delete(url, config);
    default:
      return await axios.get(url, config);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default apiRequest;
