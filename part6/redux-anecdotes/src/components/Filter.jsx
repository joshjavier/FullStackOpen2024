import { useDispatch } from 'react-redux'
import { filterChanged } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const style = { marginBottom: 10 }

  const onChange = (evt) => {
    const query = evt.target.value
    dispatch(filterChanged(query))
  }

  return (
    <div style={style}>
      <label htmlFor="t-filter">filter</label>
      {' '}
      <input type="text" id="t-filter" name="filter" onChange={onChange} />
    </div>
  )
}

export default Filter
