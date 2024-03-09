import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from './App.jsx'

import noteReducer from "./reducers/noteReducer";
import filterReducer from './reducers/filterReducer.js';

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
