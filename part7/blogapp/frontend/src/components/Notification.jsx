import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return null
  }

  const { message, type } = notification

  const style = {
    backgroundColor: 'lightgrey',
    margin: 10,
    padding: 10,
    border: '2px solid',
    borderColor: type === 'success' ? 'green' : 'red',
    borderRadius: 5,
  }

  return <div style={style}>{message}</div>
}

export default Notification
