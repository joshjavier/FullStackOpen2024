const Notification = ({ message, type }) => {
  return (
    <div role="alert" className={type}>{message}</div>
  )
}

export default Notification
