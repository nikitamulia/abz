import axios from 'axios';

const BASE_URL = ' https://frontend-test-assignment-api.abz.agency/api/v1';

// const setToken = token => {
//   axios.defaults.headers.Token = `${token}`;
// };

// const getToken = async () => {
//   try {
//     const res = await axios.get('/token');
//     setToken(res.data.token);
//   } catch (error) {
//     console.log('error', error);
//   }
// };

export const fetchUsers = async () => {
  return await axios
    .get(`${BASE_URL}/users?page=1&count=6`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const getPosition = async () => {
  return await axios
    .get(`${BASE_URL}/positions`)
    .then(response => response.data)
    .catch(error => console.log(error));
};
