import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'

export default configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer,
  },
})
