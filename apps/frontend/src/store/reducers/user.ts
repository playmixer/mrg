import {createSlice} from '@reduxjs/toolkit'
import {saveToStorage} from "./utils"
import {UserStoreProps} from "../../@types/store";

const STORE_NAME: string = 'auth';


const initialState: UserStoreProps = localStorage.getItem(STORE_NAME) ? JSON.parse(<string>localStorage.getItem(STORE_NAME)) : {
  isAuth: false,
  organization: null
}

export const user = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    login: (state: UserStoreProps, action) => {
      state = {
        ...state,
        ...action.payload
      }
      saveToStorage(state, STORE_NAME)
      return state
    },
    logout: (state: UserStoreProps) => {
      state = {
        isAuth: false
      }
      saveToStorage(state, STORE_NAME)
      return state
    },
    error: (state: UserStoreProps, action) => {
      state = {
        ...state,
        error: action.payload
      }
      return state
    },
    cleanError: (state) => {
      delete state.error
      return state
    },
    coupons: (state, action) => {
      state = {
        ...state,
        coupons: action.payload
      }
      return state
    },
    currentOrganization: (state, action) => {
      state = {
        ...state,
        organization: action.payload
      }
      return state
    }
  },
})

export const {login, logout, error, cleanError, coupons, currentOrganization} = user.actions

export default user.reducer
