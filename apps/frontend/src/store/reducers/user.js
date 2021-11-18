import {createSlice} from '@reduxjs/toolkit'
import {saveToStorage} from "./utils";

const STORE_NAME = 'auth';

const initialState = localStorage.getItem(STORE_NAME) ? JSON.parse(localStorage.getItem(STORE_NAME)) : {
  isAuth: false,
}

export const user = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    login: (state, action) => {
      state = {
        ...state,
        ...action.payload
      }
      saveToStorage(state, STORE_NAME)
      return state
    },
    logout: (state) => {
      state = {
        isAuth: false
      }
      saveToStorage(state, STORE_NAME)
      return state
    },
    error: (state, action) => {
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
    organization: (state, action) => {
      state = {
        ...state

      }
      return state
    }
  },
})

// Action creators are generated for each case reducer function
export const {login, logout, error, cleanError, coupons, organization} = user.actions

export default user.reducer
