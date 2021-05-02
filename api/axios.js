import axios from 'axios'

//Environment
const API_STARTWARDS_BASE_URL = String(process.env.API_STARTWARDS_BASE_URL);

// Config Axios
const apiClient = axios.create({
    baseURL: `${API_STARTWARDS_BASE_URL}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      enctype: 'application/json'
    }
  });

// Axios interceptors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);
export default apiClient;