import {createSlice} from '@reduxjs/toolkit'
import {saveToStorage} from "./utils";

const STORE_NAME = 'app';

interface StateInterface {
  isLoading: boolean
}

const initialState: StateInterface = localStorage.getItem(STORE_NAME) ? JSON.parse(<string>localStorage.getItem(STORE_NAME)) : {
  isLoading: false,
}

export const applicastion = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    loading: (state: StateInterface, action) => {
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
