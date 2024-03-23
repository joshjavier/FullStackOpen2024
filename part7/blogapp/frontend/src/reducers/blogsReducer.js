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
    removeBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload)
    },
    appendComment: (state, action) => {
      return state.map((blog) => {
        if (blog.id !== action.payload.blog) return blog
        return { ...blog, comments: [...blog.comments, action.payload] }
      })
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog, appendComment } =
  blogsSlice.actions

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}

export const createBlog = (blog) => async (dispatch) => {
  const newBlog = await blogService.create(blog)
  dispatch(appendBlog(newBlog))
}

export const likeBlog = (blog) => async (dispatch) => {
  const updatedBlog = await blogService.update(blog.id, {
    ...blog,
    likes: blog.likes + 1,
  })
  dispatch(updateBlog(updatedBlog))
}

export const deleteBlog = (id) => async (dispatch) => {
  await blogService.remove(id)
  dispatch(removeBlog(id))
}

export const addComment = (blogId, content) => async (dispatch) => {
  const newComment = await blogService.addComment(blogId, content)
  dispatch(appendComment(newComment))
}

export default blogsSlice.reducer
