import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  initialState: [],
  name: 'blogs',
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    appendBlog: (state, action) => {
      state.push(action.payload)
    },
    updateBlog: (state, action) => {
      return state.map((blog) => {
        return blog.id === action.payload.id ? action.payload : blog
      })
    },
  },
})

export const { setBlogs, appendBlog, updateBlog } = blogsSlice.actions

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}

export const createBlog = (blog) => async (dispatch) => {
  const newBlog = await blogService.create(blog)
  dispatch(appendBlog(newBlog))
}

export default blogsSlice.reducer
