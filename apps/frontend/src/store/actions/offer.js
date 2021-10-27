import * as storeOffer from '../reducers/offer';
import * as apiHandler from '../../api/index';

export const list = payload => dispatch =>
  apiHandler.offerList()
    .then(res => {
      if (res.status === 200 && res.data.success) {
        dispatch(storeOffer.list(res.data.data))
      }
    })
    .catch(err => console.log(err.message))
