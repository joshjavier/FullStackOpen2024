import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import App from './App.jsx'

import { createStore } from "redux";
import noteReducer from "./reducers/noteReducer";

const store = createStore(noteReducer)

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
