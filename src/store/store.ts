// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import formBuilderReducer from './formBuilderSlice'

export const store = configureStore({
  reducer: {
    formBuilder: formBuilderReducer,
  },
})

// Types for use in components
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
