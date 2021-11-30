import * as storeOffer from '../reducers/offer';
import * as apiHandler from '../../api/index';
import {errorHanding} from "../../api/handlers";

import {notify} from '../../components/Notification';

export const list = () => (dispatch: any) =>
  apiHandler.offerList()
    .then((res) => {
      if (res.status === 200 && res.data.success) {
        dispatch(storeOffer.list(res.data.data))
        return res.data.data
      }
    })
    .catch(errorHanding)

export const add = (payload: object) => (dispatch: any) =>
  apiHandler.offerNew(payload)
    .then((res: RequestResult) => {
      if (res.status === 200 && res.data.success) {
        dispatch(storeOffer.add(res.data.data))
        notify('Акция добалена', 'success')
        return res.data.data
      }
    })
    .catch(errorHanding)

export const update = (payload: object) => (dispatch: any) =>
  apiHandler.offerUpdate(payload)
    .then((res: RequestResult) => {
      if (res.status === 200 && res.data.success) {
        notify('Акция обновлена', 'success')
        dispatch(storeOffer.update(res.data.data))
        return res.data.data
      }
    })
    .catch(errorHanding)

export const buy = (payload: object) => (dispatch: any) =>
  apiHandler.offerBuyCoupon(payload)
    .then((res: RequestResult) => {
      if (res.status === 200 && res.data.success) {
        notify('Купон куплен', 'success')

      }
    })
    .catch(errorHanding)

export const addAddress = (payload: object) => (dispatch: any) =>
  apiHandler.offerAddAddress(payload)
    .then((res: RequestResult) => {
      if (res.status === 200 && res.data.success) {
        dispatch(storeOffer.addAddress(res.data.data))
        notify('Адреса обновлены', 'success')
        return res.data.data
      }
    })
    .catch(errorHanding)

export const getCoupons = (payload: object) => (dispatch: any) =>
  apiHandler.offerGetCoupons(payload)
    .then((res: RequestResult) => {
      if (res.status === 200 && res.data.success) {
        // notify('Адреса обновлены', 'success')
        return res.data.data
      }
    })
    .catch(errorHanding)

export const createCoupons = (payload: object) => (dispatch: any) =>
  apiHandler.offerCreateCoupons(payload)
    .then((res: RequestResult) => {
      if (res.status === 200 && res.data.success) {
        notify('Купоны созданы', 'success')
        return res.data.data
      }
    })
    .catch(errorHanding)

export const activateCoupon = (payload: object) => (dispatch: any) =>
  apiHandler.offerActivateCoupon(payload)
    .then((res: RequestResult) => {
      if (res.status === 200 && res.data.success) {
        notify('Купон активирован', 'success')
        return res.data.data
      }
    })
    .catch(errorHanding)
