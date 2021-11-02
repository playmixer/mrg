import {createSlice} from '@reduxjs/toolkit'
import {saveToStorage} from "./utils";

const STORE_NAME = 'offer';

const initialState = localStorage.getItem(STORE_NAME) ? JSON.parse(localStorage.getItem(STORE_NAME)) : {
  data: [],
}

export const offer = createSlice({
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
    add: (state, action) => {
      state = {
        ...state,
        data: [
          ...state.data,
          action.payload
        ]
      }
      saveToStorage(state, STORE_NAME)
      return state
    },
    update: (state, action) => {
      let data = state.data.map(v => {
        return v.id === action.payload.id ? action.payload : v;
      })
      state = {
        ...state,
        data: [
          ...data
        ]
      }
      saveToStorage(state, STORE_NAME)
      return state
    }
  }
})

// Action creators are generated for each case reducer function
export const {list, add, update} = offer.actions

export default offer.reducer
