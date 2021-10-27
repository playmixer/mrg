import {createSlice} from '@reduxjs/toolkit'
import {saveToStorage} from "./utils";

const STORE_NAME = 'app';

const initialState = localStorage.getItem(STORE_NAME) ? JSON.parse(localStorage.getItem(STORE_NAME)) : {
  isLoading: false,
}

export const applicastion = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    loading: (state, action) => {
      state = {
        ...state,
        isLoading: true
      }
      saveToStorage(state, STORE_NAME)
      return state
    },
  },
})

// Action creators are generated for each case reducer function
export const {loading} = applicastion.actions

export default applicastion.reducer
