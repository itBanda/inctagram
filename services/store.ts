import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { Action, ThunkAction, combineSlices, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { authApi } from './auth/authSlice'

const makeStore = () =>
  configureStore({
    devTools: true,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
    reducer: combineSlices(authApi),
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const wrapper = createWrapper<AppStore>(makeStore)
