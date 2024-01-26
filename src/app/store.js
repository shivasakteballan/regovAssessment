import { configureStore } from '@reduxjs/toolkit'
import tokenSlice from '../feature/auth/tokenSlice'

export default configureStore({
    reducer: {
      counter: tokenSlice,
    },
  })