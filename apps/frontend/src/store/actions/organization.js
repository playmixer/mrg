import * as apiHandle from "../../api";
import * as organizationStore from "../reducers/organization";

export const list = () => dispatch =>
  apiHandle.organizationList()
    .then(res => {
      if (res.status === 200) {
        const data = res.data
        if (data.success)
          dispatch(organizationStore.list(data.data))
      }
    })
    .catch(err => console.log(err.message))


export const add = (payload) => dispatch =>
  apiHandle.organizationNew(payload)
    .then(res => {
      if (res.status === 200 && res.data.success) {
        dispatch(organizationStore.add(payload.data))
      }
    })
    .catch(err => console.log(err.message))

export const update = (payload) => dispatch =>
  apiHandle.organizationUpdate(payload)
    .then(res => {
      if (res.status === 200 && res.data.success) {
        dispatch(organizationStore.update(res.data.data))
      }
    })
    .catch(err => console.log(err.message))

export const addUser = (payload) => dispatch =>
  apiHandle.organizationAddUser(payload)
    .then(res => {
      console.log(res)
      if (res.status === 200 && res.data.success) {
        dispatch(organizationStore.addUser(res.data.data))
      }
    })
    .catch(err => console.log(err.message))

export const removeUser = (payload) => dispatch =>
  apiHandle.organizationRemoveUser(payload)
    .then(res => {
      if (res.status === 200 && res.data.success) {
        dispatch(organizationStore.removeUser(res.data.data))
      }
    })
    .catch(err => console.log(err.message))
