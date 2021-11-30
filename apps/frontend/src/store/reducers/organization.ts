import {createSlice} from '@reduxjs/toolkit'
import {saveToStorage} from "./utils";


const STORE_NAME = 'organization';

interface StateInterface {
  data: Organization[]
}

const initialState: StateInterface = localStorage.getItem(STORE_NAME) ? JSON.parse(<string>localStorage.getItem(STORE_NAME)) : {
  data: [],
}


export const user = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    list: (state, action) => {
      state = {
        ...state,
        data: [
          ...action.payload
        ]
      }
      saveToStorage(state, STORE_NAME)
      return state
    },
    add: (state: StateInterface, action) => {
      state = {
        ...state,
        data: [
          ...state.data,
          ...action.payload
        ]
      }
      saveToStorage(state, STORE_NAME)
      return state
    },
    update: (state: StateInterface, action) => {
      state = {
        ...state,
        ...action.payload
      }

      return state
    },
    addUser: (state: StateInterface, action) => {
      state = {
        ...state,
        data: [
          ...state.data.map((v) => v.id == action.payload.id ? action.payload : v),
        ]
      }
      return state
    },
    removeUser: (state: StateInterface, action) => {
      state = {
        ...state,
        data: [
          ...state.data.map((v) => v.id == action.payload.id ? action.payload : v),
        ]
      }
      return state
    },
  },
})

export const {list, add, update, addUser, removeUser} = user.actions

export default user.reducer
