import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <label htmlFor="r-all">all</label>
      <input
        type="radio"
        name="filter"
        id="r-all"
        onChange={() => dispatch(filterChange('ALL'))}
        defaultChecked
      />

      <label htmlFor="r-important">important</label>
      <input
        type="radio"
        name="filter"
        id="r-important"
        onChange={() => dispatch(filterChange('IMPORTANT'))}
      />

      <label htmlFor="r-nonimportant">nonimportant</label>
      <input
        type="radio"
        name="filter"
        id="r-nonimportant"
        onChange={() => dispatch(filterChange('NONIMPORTANT'))}
      />
    </div>
  )
}

export default VisibilityFilter
