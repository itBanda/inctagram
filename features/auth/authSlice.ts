import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  initialState: { accessToken: null as null | string },
  name: 'auth',
  reducers: {
    clearToken(state) {
      state.accessToken = null
    },
    setToken(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken
    },
  },
  selectors: {
    selectAccessToken: state => state.accessToken,
  },
})

export const authActions = authSlice.actions
export const authSelectors = authSlice.selectors

export default authSlice.reducer
