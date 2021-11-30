import * as apiHandle from '../../api/index';
import * as userStore from '../reducers/user'
import {errorHanding} from "../../api/handlers";


export const login = (payload: {username: string, password: string}) => (dispatch: any) => {
  apiHandle.authLogin(payload)
    .then((res: RequestResult) => {
      if (res.status === 200) {
        dispatch(userStore.login(res.data));
      } else {
        dispatch(userStore.logout());
      }
    })
    .catch((err: RequestError) => {
      dispatch(userStore.error(err.message));
      dispatch(userStore.logout());
    })
}

export const logout = () => (dispatch: any) =>
  apiHandle.authLogout()
    .then((res: RequestResult) => {
      dispatch(userStore.logout())
    })
    .catch((err: RequestError) => dispatch(userStore.error(err.message)))
    .finally(() => dispatch(userStore.logout()))

export const check = () => (dispatch: any) =>
  apiHandle.authState()
    .then((res: RequestResult) => {
      if (res.status === 200) {
        dispatch(userStore.login(res.data))
      } else {
        dispatch(userStore.logout());
      }
    })
    .catch((err: RequestError) => {
      dispatch(userStore.error(err.message));
      dispatch(userStore.logout());
      errorHanding(err);
    })

export const search = (payload: any) =>
  apiHandle.userSearch(payload)
    .then((res: RequestResult) => {
      if (res.status === 200 && res.data.success) {
        return res.data.data
      }
    })
    .catch(errorHanding)

export const coupons = () => (dispatch: any) =>
  apiHandle.userCoupons()
    .then((res: RequestResult) => {
      if (res.status === 200 && res.data.success) {
        dispatch(userStore.coupons(res.data.data))
        return res.data
      }
    })
    .catch(errorHanding)

export const currentOrganization = (payload: object) => (dispatch: any) =>
  apiHandle.organizationCurrent(payload)
    .then((res: RequestResult) => {
      if (res.status === 200 && res.data.success) {
        dispatch(userStore.currentOrganization(res.data.data))
        return res.data.data
      }
    })
    .catch(errorHanding)
