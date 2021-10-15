const axios = require('axios');

const _request = (url, method, data) =>
  axios({
    method,
    url,
    data
  }).then(console.log)

const _post = (url, data) =>
  _request(url, 'post', data)

const _get = (url, data) =>
  _request(url, 'get', data)


export const authLogin = (payload) => {
  return _post('/api/v0/auth/login/', payload)
}

export const authState = (payload = {}) => {
  return _get('/api/v0/auth/')
}

