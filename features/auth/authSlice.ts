import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  initialState: { accessToken: null as null | string, isLoggedIn: false },
  name: 'auth',
  reducers: {
    login(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken
      state.isLoggedIn = true
    },
    logout(state) {
      state.accessToken = null
      state.isLoggedIn = false
    },
  },
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
  },
})

export const authActions = authSlice.actions
export const authSelectors = authSlice.selectors

export default authSlice.reducer
