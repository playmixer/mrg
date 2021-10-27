const axios = require('axios');

const getCSRF = () => {
  if (!document.cookie) {
    return null;
  }

  const xsrfCookies = document.cookie.split(';')
    .map(c => c.trim())
    .filter(c => c.startsWith(name + 'csrftoken='));
  if (xsrfCookies.length === 0) {
    return null;
  }
  return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}

const _request = (url, method, data, headers = {}) => {
  // console.log(headers)
  return axios({
    method,
    url,
    data,
    headers
  })
}

const _post = (url, data) =>
  _request(url, 'post', data, {"X-CSRFToken": getCSRF()})

const _update = (url, data) =>
  _request(url, 'put', data, {"X-CSRFToken": getCSRF()})

const _delete = (url, data) =>
  _request(url, 'delete', data, {"X-CSRFToken": getCSRF()})

const _get = (url, data = {}) => {
  const query = Object.keys(data).map(k => {
    return `${[k]}=${data[k]}`
  }).join('&')
  return _request(`${url}?${query}`, 'get', {})
}
// Auth API
export const authLogin = (payload) =>
  _post('/api/v0/auth/login/', payload)

export const authLogout = () =>
  _get('/api/v0/auth/logout/', {})

export const authState = (payload = {}) =>
  _get('/api/v0/auth/')

// Organization API
export const organizationNew = (payload) =>
  _post('/api/v0/organizations/', payload)

export const organizationList = (payload) =>
  _get('/api/v0/organizations/', {})

export const organizationUpdate = (payload) =>
  _update('/api/v0/organizations/', payload)

export const organizationAddUser = (payload) =>
  _post('/api/v0/organizations/user/', payload)

export const organizationRemoveUser = (payload) =>
  _delete('/api/v0/organizations/user/', payload)

// User API
export const userSearch = (payload) =>
  _get('/api/v0/user/search/', payload)

// Offer API
export const offerList = payload =>
  _get('/api/v0/offer/')
