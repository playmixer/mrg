import {Config} from "../config";

const axios = require('axios');

const API = Config.SUBDIRECTORY

const getCSRF = () => {
  if (!document.cookie) {
    return null;
  }

  const xsrfCookies = document.cookie.split(';')
    .map(c => c.trim())
    .filter(c => c.startsWith('csrftoken='));
  if (xsrfCookies.length === 0) {
    return null;
  }
  return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}

const _request = (url: string, method: string, data: object, headers: {} = {}) => {
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

const _post = (url: string, data: object, headers: {} = {}) =>
  _request(url, 'post', data, {"X-CSRFToken": getCSRF(), ...headers})

const _update = (url: string, data: object) =>
  _request(url, 'put', data, {"X-CSRFToken": getCSRF()})

const _delete = (url: string, data: object) =>
  _request(url, 'delete', data, {"X-CSRFToken": getCSRF()})

const _get = (url: string, data: object = {}) => {
  const query = Object.keys(data).map(k => {
    // @ts-ignore
    return `${[k]}=${data[k]}`
  }).join('&')
  return _request(`${url}?${query}`, 'get', {})
}

// Application

export const urlStores = `${API}/api/v0/stores/`

export const upload = (payload: any) =>
  _post(`${API}/api/v0/upload/`, payload)

export const getCity = () =>
  _get(`${API}/api/v0/city/`, {})

// Auth API
export const authLogin = (payload: { username: string, password: string }) =>
  _post(`${API}/api/v0/auth/login/`, payload)
// .then((res: UserRequest) => {
//     return res
// })

export const authLogout = () =>
  _get(`${API}/api/v0/auth/logout/`, {})

export const authRegistration = (payload: { username: string, password: string, password2: string }) =>
  _post(`${API}/api/v0/auth/registration/`, payload)

export const authState = () =>
  _get(`${API}/api/v0/auth/`)

// Organization API
export const organizationNew = (payload: any) =>
  _post(`${API}/api/v0/organizations/`, payload)

export const organizationList = () =>
  _get(`${API}/api/v0/organizations/`)

export const organizationUpdate = (payload: any) =>
  _update(`${API}/api/v0/organizations/`, payload)

export const organizationAddUser = (payload: any) =>
  _post(`${API}/api/v0/organizations/user/`, payload)

export const organizationRemoveUser = (payload: any) =>
  _delete(`${API}/api/v0/organizations/user/`, payload)

export const organizationSearch = (payload: any) =>
  _get(`${API}/api/v0/organizations/search/`, payload)

export const organizationCurrent = () =>
  _get(`${API}/api/v0/organization/`)

// User API
export const userSearch = (payload: any) =>
  _get(`${API}/api/v0/user/search/`, payload)

export const userCoupons = () =>
  _get(`${API}/api/v0/user/coupons/`)

// Offer API
export const offerList = () =>
  _get(`${API}/api/v0/offers/`)

export const offerNew = (payload: any) =>
  _post(`${API}/api/v0/offer/`, payload)

export const offerUpdate = (payload: any) =>
  _update(`${API}/api/v0/offer/`, payload)

export const offerAddAddress = (payload: any) =>
  _post(`${API}/api/v0/offer/address/`, payload)

export const offerCreateCoupons = (payload: any) =>
  _post(`${API}/api/v0/offer/coupons/`, payload)

export const offerGetCoupons = (payload: any) =>
  _get(`${API}/api/v0/offer/coupons/`, payload)

export const offerBuyCoupon = (payload: any) =>
  _post(`${API}/api/v0/offer/coupon/buy/`, payload)

export const offerActivateCoupon = (payload: any) =>
  _post(`${API}/api/v0/offer/coupon/activate/`, payload)
