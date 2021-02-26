import axios from 'axios';
import { environment } from '../_config';

const API_URL = environment.API_URL;

export const userService = {
  login,
  logout,
};

function login(username, password) {
  return axios
    .get(API_URL + `/user?username=${username}&password=${password}`)
    .then((user) => {
      localStorage.setItem('user', user.data[0].id);
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}
