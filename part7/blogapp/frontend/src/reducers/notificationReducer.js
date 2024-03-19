import { createSlice } from '@reduxjs/toolkit'

let timeoutID

const notificationSlice = createSlice({
  initialState: null,
  name: 'notification',
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: () => null,
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const notify =
  (message, type = 'success') =>
  (dispatch) => {
    dispatch(setNotification({ message, type }))
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

export default notificationSlice.reducer
