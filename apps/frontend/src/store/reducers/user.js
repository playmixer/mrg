import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isAuth: false,
}

export const user = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = {
        ...action.payload
      }
    },
    logout: (state) => {
      state.value = initialState
    },
  },
})

// Action creators are generated for each case reducer function
export const {login, logout} = user.actions

export default user.reducer
