import * as appStore from '../reducers/application';
import * as apiHandler from '../../api/index';
import {errorHanding} from "../../api/handlers";

export const loading = (payload: object) => (dispatch: any) =>
  dispatch(appStore.loading(payload))

export const openCityModal = () => (dispatch) =>
  dispatch(appStore.openModalCity({}))

export const closeCityModal = () => (dispatch) =>
  dispatch(appStore.closeModalCity({}))

export const selectCity = (payload) => (dispatch) =>
  dispatch(appStore.setCity(payload))

export const updateCityList = () => (dispatch) =>
  apiHandler.getCity()
    .then(res => {
      if (res.status === 200 && res.data.success) {
        dispatch(appStore.updateCityList(res.data.data))
      }
    })
    .catch(errorHanding)
