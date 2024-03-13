import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterChanged: (state, action) => {
      return action.payload
    },
  },
})

export const { filterChanged } = filterSlice.actions
export default filterSlice.reducer
