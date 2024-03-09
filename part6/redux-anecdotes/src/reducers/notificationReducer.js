import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    updateNotification: (state, action) => {
      return action.payload
    },
    removeNotification: () => '',
  },
})

export const { updateNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
