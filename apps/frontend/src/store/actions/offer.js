import * as storeOffer from '../reducers/offer';
import * as apiHandler from '../../api/index';
import {errorHanding} from "../../api/handlers";

import {notify} from '../../components/Notification';

export const list = payload => dispatch =>
  apiHandler.offerList()
    .then(res => {
      if (res.status === 200 && res.data.success) {
        dispatch(storeOffer.list(res.data.data))
      }
    })
    .catch(errorHanding)

export const add = payload => dispatch =>
  apiHandler.offerNew(payload)
    .then(res => {
      if (res.status === 200 && res.data.success) {
        dispatch(storeOffer.add(res.data.data))
        notify('Акция добалена', 'success')
        return res.data.data
      }
    })
    .catch(errorHanding)

export const update = payload => dispatch =>
  apiHandler.offerUpdate(payload)
    .then(res => {
      if (res.status === 200 && res.data.success) {
        notify('Акция обновлена', 'success')
        dispatch(storeOffer.update(res.data.data))
        return res.data
      }
    })
    .catch(errorHanding)

export const buy = payload => dispatch =>
  apiHandler.offerBuyCoupon(payload)
    .then(res => {
      if (res.status === 200 && res.data.success) {
        notify('Купон куплен', 'success')

      }
    })
    .catch(errorHanding)

export const addAddress = payload => dispatch =>
  apiHandler.offerAddAddress(payload)
    .then(res => {
      if (res.status === 200 && res.data.success) {
        dispatch(storeOffer.addAddress(res.data.data))
        notify('Адреса обновлены', 'success')
        return res.data.data
      }
    })
    .catch(errorHanding)

export const getCoupons = payload => dispatch =>
  apiHandler.offerGetCoupons(payload)
    .then(res => {
      if (res.status === 200 && res.data.success) {
        // notify('Адреса обновлены', 'success')
        return res.data.data
      }
    })
    .catch(errorHanding)

export const createCoupons = payload => dispatch =>
  apiHandler.offerCreateCoupons(payload)
    .then(res => {
      if (res.status === 200 && res.data.success) {
        notify('Купоны созданы', 'success')
        return res.data.data
      }
    })
    .catch(errorHanding)

export const activateCoupon = payload => dispatch =>
  apiHandler.offerActivateCoupon(payload)
    .then(res => {
      if (res.status === 200 && res.data.success) {
        notify('Купон активирован', 'success')
        return res.data.data
      }
    })
    .catch(errorHanding)
