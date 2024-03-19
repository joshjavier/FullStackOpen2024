import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import storage from '../services/storage'

const userSlice = createSlice({
  initialState: null,
  name: 'user',
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,
  },
})

export const { setUser, clearUser } = userSlice.actions

export const checkLoggedInUser = () => (dispatch) => {
  const user = storage.loadUser()
  dispatch(setUser(user))
}

export const login = (credentials) => async (dispatch) => {
  const user = await loginService.login(credentials)
  storage.saveUser(user)
  dispatch(setUser(user))

  return user
}

export const logout = () => (dispatch) => {
  storage.removeUser()
  dispatch(clearUser())
}

export default userSlice.reducer
