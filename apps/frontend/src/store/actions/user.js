import * as apiHandle from '../../api/index';
import * as userStore from '../reducers/user'

export const login = payload => dispatch => {
  apiHandle.authLogin(payload)
    .then(res => {
      if (res.status === 200) {
        dispatch(userStore.login(res.data));
      } else {
        dispatch(userStore.logout());
      }
    })
    .catch(err => {
      dispatch(userStore.error(err.message));
      dispatch(userStore.logout());
    })
}

export const logout = payload => dispatch =>
  apiHandle.authLogout()
    .then(res => {
      dispatch(userStore.logout())
    })
    .catch(err => dispatch(userStore.error(err.message)))
    .finally(() => dispatch(userStore.logout()))

export const check = () => dispatch =>
  apiHandle.authState()
    .then(res => {
      if (res.status === 200) {
        dispatch(userStore.login(res.data))
      } else {
        dispatch(userStore.logout());
      }
    })
    .catch(err => {
      dispatch(userStore.error(err.message));
      dispatch(userStore.logout());
    })

export const search = (payload) =>
  apiHandle.userSearch(payload)
    .then(res => {
      if (res.status === 200 && res.data.success) {
        return res.data.data
      }
    })
    .catch(err => console.log(err.message))
