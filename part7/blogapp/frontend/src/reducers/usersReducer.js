import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const usersSlice = createSlice({
  initialState: [],
  name: 'users',
  reducers: {
    setUsers: (state, action) => {
      return action.payload
    },
  },
})

export const { setUsers } = usersSlice.actions

export const initializeUsers = () => async (dispatch) => {
  const users = await userService.getAll()
  dispatch(setUsers(users))
}

export default usersSlice.reducer
