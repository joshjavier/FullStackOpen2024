import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Test notification',
  reducers: {
    notificationChanged: (state, action) => {
      return action.payload
    },
  },
})

export const { notificationChanged } = notificationSlice.actions
export default notificationSlice.reducer
