import * as storeOffer from '../reducers/offer';
import * as apiHandler from '../../api/index';
import {errorHanding} from "../../api/response";

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
      }
    })
    .catch(errorHanding)

export const update = payload => dispatch =>
  apiHandler.offerUpdate(payload)
    .then(res => {
      if (res.status === 200 && res.data.success) {
        notify('Акция обновлена', 'success')
        dispatch(storeOffer.update(res.data.data))
      }
    })
    .catch(errorHanding)
