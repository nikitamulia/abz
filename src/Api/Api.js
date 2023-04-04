import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = ' https://frontend-test-assignment-api.abz.agency/api/v1';

const setToken = token => {
  axios.defaults.headers.Token = `${token}`;
};

const getToken = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/token`);
    setToken(res.data.token);
  } catch (error) {
    console.log('error', error);
  }
};

export const fetchUsers = async (page = 1) => {
  try {
    const res = await axios.get(`${BASE_URL}/users?page=${page}&count=6`);
    const data = res.data;
    return data;
  } catch (error) {
    const err = error.response.status;
    if (err === 404) toast.error('Page not found.');
    if (err === 422) toast.error('Validation failed.');
  }
};

export const getPosition = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/positions`);
    return res.data;
  } catch (error) {
    const err = error.response.status;
    if (err === 404) toast.error('Page not found.');
    if (err === 422) toast.error('Positions not found.');
  }
};

export const postUser = async formData => {
  try {
    await getToken();
    const res = await axios.post(`${BASE_URL}/users`, formData);
    return res.data;
  } catch (error) {
    const err = error.response.status;
    if (err === 401) toast.error('The token expired.');
    if (err === 409)
      toast.error('User with this phone or email already exist.');
    if (err === 422) toast.error('Validation failed.');
  }
};

export const getUserById = async id => {
  try {
    const res = await axios.get(`${BASE_URL}/users/${id}`);
    const data = res.data;
    return data;
  } catch (error) {
    console.log('error', error);
  }
};
console.log(getUserById(13500));
