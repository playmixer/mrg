import {Config} from "../config";

import axios, {AxiosPromise, Method} from 'axios'

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

const _request = async <T,>(url, method: Method, data, headers: {} = {}) => {
  // console.log(headers)
  return axios({
    method,
    url,
    data,
    headers: {
      ...headers,
    }
  }) as AxiosPromise<T>
}

const _post = async <T = RequestResult,>(url: string, data: object, headers: {} = {}) =>
  _request<T>(url, 'post', data, {"X-CSRFToken": getCSRF(), ...headers})

const _update = async <T = RequestResult,>(url: string, data: object) =>
  _request<T>(url, 'put', data, {"X-CSRFToken": getCSRF()})

const _delete = async <T = RequestResult,>(url: string, data: object) =>
  _request<T>(url, 'delete', data, {"X-CSRFToken": getCSRF()})

const _get = async <T = RequestResult,>(url: string, data: object = {}) => {
  const query = Object.keys(data).map(k => {
    // @ts-ignore
    return `${[k]}=${data[k]}`
  }).join('&')
  return _request<T>(`${url}?${query}`, 'get', {})
}

// Application

export const urlStores = `${API}/api/v0/stores/`

export const upload = async (payload: any) =>
  _post(`${API}/api/v0/upload/`, payload)

export const getCity = async () =>
  _get(`${API}/api/v0/city/`, {})

// Auth API
export const authLogin = async (payload: { username: string, password: string }) =>
  _post(`${API}/api/v0/auth/login/`, payload)
// .then((res: UserRequest) => {
//     return res
// })

export const authLogout = async() =>
  _get(`${API}/api/v0/auth/logout/`, {})

export const authRegistration = async (payload: { username: string, password: string, password2: string }) =>
  _post(`${API}/api/v0/auth/registration/`, payload)

export const authState = async () =>
  _get(`${API}/api/v0/auth/`)

// Organization API
export const organizationNew = async (payload: any) =>
  _post(`${API}/api/v0/organizations/`, payload)

export const organizationList = async () =>
  _get(`${API}/api/v0/organizations/`)

export const organizationUpdate = async (payload: any) =>
  _update(`${API}/api/v0/organizations/`, payload)

export const organizationAddUser = async (payload: any) =>
  _post(`${API}/api/v0/organizations/user/`, payload)

export const organizationRemoveUser = async (payload: any) =>
  _delete(`${API}/api/v0/organizations/user/`, payload)

export const organizationSearch = async (payload: any) =>
  _get(`${API}/api/v0/organizations/search/`, payload)

export const organizationCurrent = async () =>
  _get(`${API}/api/v0/organization/`)

// User API
export const userSearch = async (payload: any) =>
  _get(`${API}/api/v0/user/search/`, payload)

export const userCoupons = async () =>
  _get(`${API}/api/v0/user/coupons/`)

// Offer API
export const offerList = async () =>
  _get(`${API}/api/v0/offers/`)

export const offerNew = async (payload: any) =>
  _post(`${API}/api/v0/offer/`, payload)

export const offerUpdate = async (payload: any) =>
  _update(`${API}/api/v0/offer/`, payload)

export const offerAddAddress = async (payload: any) =>
  _post(`${API}/api/v0/offer/address/`, payload)

export const offerCreateCoupons = async (payload: any) =>
  _post(`${API}/api/v0/offer/coupons/`, payload)

export const offerGetCoupons = async (payload: any) =>
  _get(`${API}/api/v0/offer/coupons/`, payload)

export const offerBuyCoupon = async (payload: any) =>
  _post(`${API}/api/v0/offer/coupon/buy/`, payload)

export const offerActivateCoupon = async (payload: any) =>
  _post(`${API}/api/v0/offer/coupon/activate/`, payload)
