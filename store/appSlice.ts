import { createSlice } from '@reduxjs/toolkit'
export const appSlice = createSlice({
  initialState: { isAppInitialized: false },
  name: 'app',
  reducers: {
    init(state) {
      state.isAppInitialized = true
    },
  },
  selectors: {
    selectIsAppInitialized: state => state.isAppInitialized,
  },
})

export const appActions = appSlice.actions
export const appSelectors = appSlice.selectors

export default appSlice.reducer
