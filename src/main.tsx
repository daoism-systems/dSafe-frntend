import React from 'react'
import './components/polyfill'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import RainbowKit from './components/RainbowKit.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RainbowKit>
      <App />
    </RainbowKit>
  </React.StrictMode>,
)
