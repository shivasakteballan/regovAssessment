import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: null,
    accessToken: null,
  },
  reducers: {
    savingToken: (state, action) => {
      state.value = action.payload;
    },
    savingAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
})

export const { savingToken, savingAccessToken } = tokenSlice.actions

export default tokenSlice.reducer