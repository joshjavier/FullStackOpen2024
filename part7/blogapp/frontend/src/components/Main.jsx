import { useRef } from 'react'
import BlogList from './BlogList'
import NewBlog from './NewBlog'
import Toggleable from './Toggleable'

const Main = () => {
  const ref = useRef()

  return (
    <div>
      <Toggleable buttonLabel="create new blog" ref={ref}>
        <NewBlog toggleVisibility={() => ref.current.toggleVisibility()} />
      </Toggleable>
      <BlogList />
    </div>
  )
}

export default Main
