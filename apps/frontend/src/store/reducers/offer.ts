import {createSlice} from '@reduxjs/toolkit'
import {saveToStorage} from "./utils";
import {OfferStoreProps} from "../../@types/store";


const STORE_NAME = 'offer';

const initialState: OfferStoreProps = localStorage.getItem(STORE_NAME) ? JSON.parse(<string>localStorage.getItem(STORE_NAME)) : {
  data: [],
}

const save = (state: OfferStoreProps) =>
  saveToStorage(state, STORE_NAME)


export const offer = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    list: (state: OfferStoreProps, action) => {
      state = {
        ...state,
        data: [
          ...action.payload
        ]
      }
      save(state)
      return state
    },
    add: (state: OfferStoreProps, action) => {
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
    update: (state: OfferStoreProps, action) => {
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
    addAddress: (state: OfferStoreProps, action) => {
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
