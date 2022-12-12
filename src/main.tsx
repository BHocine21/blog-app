import React from 'react'
import { createRoot } from 'react-dom/client'

import './css/index.css'

import 'utils/fakeBackend'

import App from './App'

const boot = () => {
  const root = createRoot(document.getElementById('root'))

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

boot()
