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
  }
})

// Action creators are generated for each case reducer function
export const {list} = offer.actions

export default offer.reducer
