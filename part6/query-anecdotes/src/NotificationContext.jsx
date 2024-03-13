/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useRef } from "react";

const NotificationContext = createContext(null)

const reducer = (state, action) => {
  switch (action.type) {
    case 'setNotification':
      return action.payload
    case 'clearNotification':
      return ''
    default:
      return state
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(reducer, '')
  const timeoutID = useRef(null)

  return (
    <NotificationContext.Provider value={[notification, dispatch, timeoutID]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationMessage = () => {
  const value = useContext(NotificationContext)
  return value[0]
}

export const useNotificationDispatch = () => {
  const value = useContext(NotificationContext)
  return value.slice(1)
}

export const setNotification = (message) => ({
  type: 'setNotification',
  payload: message,
})

export const clearNotification = () => ({
  type: 'clearNotification'
})

export default NotificationContext
