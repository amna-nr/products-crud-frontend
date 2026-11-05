import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ErrorBoundary } from "react-error-boundary";


createRoot(document.getElementById('root')).render(
  <ErrorBoundary fallback={<p>Something went wrong. Please refresh.</p>}>
    <StrictMode>
      <App />
    </StrictMode>
  </ErrorBoundary>
)
