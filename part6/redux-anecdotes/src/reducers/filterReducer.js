const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'filter/filterChanged':
      return action.payload
    default:
      return state
  }
}

export const filterAnecdotes = (query) => ({
  type: 'filter/filterChanged',
  payload: query,
})

export default filterReducer
