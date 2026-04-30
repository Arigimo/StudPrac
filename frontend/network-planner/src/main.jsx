import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // Если этот файл есть, если нет — удали строку

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
