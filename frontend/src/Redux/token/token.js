import axios from 'axios';

const initializeAxiosAuthHeader = () => {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  }
};
initializeAxiosAuthHeader();
export default initializeAxiosAuthHeader;
