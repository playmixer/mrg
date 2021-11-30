import {createSlice} from '@reduxjs/toolkit'
import {saveToStorage} from "./utils";
import {StoreApplicationProps} from "../../@types/store";

const STORE_NAME = 'app';

const initialState: StoreApplicationProps = localStorage.getItem(STORE_NAME) ? JSON.parse(<string>localStorage.getItem(STORE_NAME)) : {
  isLoading: false,
  isOpenCity: false,
  cityList: [],
  currentCity: null
}

const save = (state) =>
  saveToStorage(state, STORE_NAME)

export const application = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    loading: (state: StoreApplicationProps, action) => {
      state = {
        ...state,
        isLoading: true
      }
      save(state)
      return state
    },
    openModalCity: (state: StoreApplicationProps, action) => {
      state = {
        ...state,
        isOpenCity: true
      }
      return state
    },
    closeModalCity: (state: StoreApplicationProps, action) => {
      state = {
        ...state,
        isOpenCity: false
      }
      save(state)
      return state
    },
    updateCityList: (state: StoreApplicationProps, action) => {
      state = {
        ...state,
        cityList: action.payload
      }

      return state
    },
    setCity: (state: StoreApplicationProps, action) => {
      state = {
        ...state,
        currentCity: action.payload
      }
      save(state)
      return state
    }
  },

})

// Action creators are generated for each case reducer function
export const {loading, openModalCity, closeModalCity, updateCityList, setCity} = application.actions

export default application.reducer
