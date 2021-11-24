import * as apiHandle from "../../api";
import * as organizationStore from "../reducers/organization";
import {RequestError, RequestResult} from "../../types/request";

export const list = () => (dispatch: any) =>
  apiHandle.organizationList()
    .then((res: RequestResult) => {
      if (res.status === 200) {
        const data = res.data
        if (data.success)
          dispatch(organizationStore.list(data.data))
      }
    })
    .catch((err: RequestError) => console.log(err.message))


export const add = (payload: object & {data: object}) => (dispatch: any) =>
  apiHandle.organizationNew(payload)
    .then((res: RequestResult) => {
      if (res.status === 200 && res.data.success) {
        dispatch(organizationStore.add(payload.data))
      }
    })
    .catch((err: RequestError) => console.log(err.message))

export const update = (payload: object) => (dispatch: any) =>
  apiHandle.organizationUpdate(payload)
    .then((res: RequestResult) => {
      if (res.status === 200 && res.data.success) {
        dispatch(organizationStore.update(res.data.data))
      }
    })
    .catch((err: RequestError) => console.log(err.message))

export const addUser = (payload: object) => (dispatch: any) =>
  apiHandle.organizationAddUser(payload)
    .then((res: RequestResult) => {
      console.log(res)
      if (res.status === 200 && res.data.success) {
        dispatch(organizationStore.addUser(res.data.data))
      }
    })
    .catch((err: RequestError) => console.log(err.message))

export const removeUser = (payload: object) => (dispatch: any) =>
  apiHandle.organizationRemoveUser(payload)
    .then((res: RequestResult) => {
      if (res.status === 200 && res.data.success) {
        dispatch(organizationStore.removeUser(res.data.data))
      }
    })
    .catch((err: RequestError) => console.log(err.message))
