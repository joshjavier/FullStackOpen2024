import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const timeoutId = useRef()
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  useEffect(() => {
    if (!notification) return
    clearTimeout(timeoutId.current)
    timeoutId.current = setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }, [dispatch, notification])

  return notification && (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
