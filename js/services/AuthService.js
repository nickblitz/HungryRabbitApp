
import config from '../config.js';

function login(email, password) {
  const data = fetch(`${config.root}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return data;
}

function signup(email, password) {
  const data = fetch(`${config.root}/users/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return data;
}

function getUser(token) {
  const data = fetch(`${config.root}/users`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return data;
}

function logout(token) {
  const data = fetch(`${config.root}/auth/logout`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return data;
}

export default { login, signup, getUser, logout };
