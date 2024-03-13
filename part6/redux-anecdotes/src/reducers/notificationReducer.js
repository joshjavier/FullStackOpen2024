import { createSlice } from '@reduxjs/toolkit'

let timeoutID

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    updateNotification: (state, action) => {
      return action.payload
    },
    clearNotification: () => '',
  },
})

export const { updateNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, duration) => async (dispatch) => {
  clearTimeout(timeoutID)
  dispatch(updateNotification(message))
  timeoutID = setTimeout(() => {
    dispatch(clearNotification())
  }, duration * 1000)
}

export default notificationSlice.reducer
