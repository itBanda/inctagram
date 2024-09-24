import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  initialState: { isAppLoading: false },
  name: 'app',
  reducers: {
    setAppLoading(state, action: PayloadAction<{ isAppLoading: boolean }>) {
      state.isAppLoading = action.payload.isAppLoading
    },
  },
  selectors: {
    selectIsAppLoading: state => state.isAppLoading,
  },
})

export const appActions = appSlice.actions
export const appSelectors = appSlice.selectors

export default appSlice.reducer
