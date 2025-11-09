import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Network from './utils/Network.js'

const net = new Network("8XWyrrskeQ81IJmOMUnSqv8R9cogCTnqrP7KU13O_8c");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App net={net}/>
  </StrictMode>
)
