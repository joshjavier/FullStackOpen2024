import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

export default configureStore({
  reducer: {
    blogs: blogsReducer,
    users: usersReducer,
    notification: notificationReducer,
    user: userReducer,
  },
})
