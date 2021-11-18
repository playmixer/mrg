const axios = require('axios');

const API = ''

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
    headers: {
      ...headers,
    }
  })
}

const _post = (url, data, headers) =>
  _request(url, 'post', data, {"X-CSRFToken": getCSRF(), ...headers})

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

// Application

export const upload = (payload) =>
  _post(`${API}/api/v0/upload/`, payload)

// Auth API
export const authLogin = (payload) =>
  _post(`${API}/api/v0/auth/login/`, payload)
    .then(res => {
      console.log(res.headers)

      return res
    })

export const authLogout = () =>
  _get(`${API}/api/v0/auth/logout/`, {})

export const authState = (payload = {}) =>
  _get(`${API}/api/v0/auth/`)

// Organization API
export const organizationNew = (payload) =>
  _post(`${API}/api/v0/organizations/`, payload)

export const organizationList = (payload) =>
  _get(`${API}/api/v0/organizations/`, {})

export const organizationUpdate = (payload) =>
  _update(`${API}/api/v0/organizations/`, payload)

export const organizationAddUser = (payload) =>
  _post(`${API}/api/v0/organizations/user/`, payload)

export const organizationRemoveUser = (payload) =>
  _delete(`${API}/api/v0/organizations/user/`, payload)

export const organizationSearch = (payload) =>
  _get(`${API}/api/v0/organizations/search/`, payload)

// User API
export const userSearch = (payload) =>
  _get(`${API}/api/v0/user/search/`, payload)

export const userCoupons = (payload) =>
  _get(`${API}/api/v0/user/coupons/`)

// Offer API
export const offerList = payload =>
  _get(`${API}/api/v0/offers/`)

export const offerNew = payload =>
  _post(`${API}/api/v0/offer/`, payload)

export const offerUpdate = payload =>
  _update(`${API}/api/v0/offer/`, payload)

export const offerAddAddress = payload =>
  _post(`${API}/api/v0/offer/address/`, payload)

export const offerCreateCoupons = payload =>
  _post(`${API}/api/v0/offer/coupons/`, payload)

export const offerGetCoupons = payload =>
  _get(`${API}/api/v0/offer/coupons/`, payload)

export const offerBuyCoupon = payload =>
  _post(`${API}/api/v0/offer/coupon/buy/`, payload)

export const offerActivateCoupon = payload =>
  _post(`${API}/api/v0/offer/coupon/activate/`, payload)
