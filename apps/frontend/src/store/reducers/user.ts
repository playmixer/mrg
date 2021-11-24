import {createSlice} from '@reduxjs/toolkit'
import {saveToStorage} from "./utils";
import {Coupons} from "../../types/offer";
import {Organization} from "../../types/orgranization";

const STORE_NAME: string = 'auth';

interface StateInterface {
  isAuth: boolean
  organization?: Organization
  error?: string
  coupons?: Coupons[]
}

const initialState: StateInterface = localStorage.getItem(STORE_NAME) ? JSON.parse(<string>localStorage.getItem(STORE_NAME)) : {
  isAuth: false,
  organization: null
}

export const user = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    login: (state: StateInterface, action) => {
      state = {
        ...state,
        ...action.payload
      }
      saveToStorage(state, STORE_NAME)
      return state
    },
    logout: (state: StateInterface) => {
      state = {
        isAuth: false
      }
      saveToStorage(state, STORE_NAME)
      return state
    },
    error: (state: StateInterface, action) => {
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
