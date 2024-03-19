import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
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

  return (
    <div style={style}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string,
  }),
}

export default Notification
