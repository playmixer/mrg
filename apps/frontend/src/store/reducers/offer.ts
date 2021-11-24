import {createSlice} from '@reduxjs/toolkit'
import {saveToStorage} from "./utils";
import {Offer} from "../../types/offer";

const STORE_NAME = 'offer';

interface StateInterface {
  data: Offer[]
}

const initialState: StateInterface = localStorage.getItem(STORE_NAME) ? JSON.parse(<string>localStorage.getItem(STORE_NAME)) : {
  data: [],
}

const save = (state: StateInterface) =>
  saveToStorage(state, STORE_NAME)


export const offer = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    list: (state: StateInterface, action) => {
      state = {
        ...state,
        data: [
          ...action.payload
        ]
      }
      save(state)
      return state
    },
    add: (state: StateInterface, action) => {
      state = {
        ...state,
        data: [
          ...state.data,
          action.payload
        ]
      }
      save(state)
      return state
    },
    update: (state: StateInterface, action) => {
      let data = state.data.map((v) => {
        return v.id === action.payload.id ? action.payload : v;
      })
      state = {
        ...state,
        data: [
          ...data
        ]
      }
      save(state)
      return state
    },
    addAddress: (state: StateInterface, action) => {
      let data = state.data.map(v => {
        return v.id === action.payload.id ? action.payload : v;
      })
      state = {
        ...state,
        data: [
          ...data
          ]
      }

      save(state)
      return state
    }
  }
})

export const {list, add, update, addAddress} = offer.actions

export default offer.reducer
