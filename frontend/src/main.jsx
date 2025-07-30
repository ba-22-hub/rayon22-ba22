// Importing dependencies
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { AuthorProvider } from './context/AuthorContext'

// Importing styles
import './styles/index.css'

// Importing the main app component
import App from './App'

// Creating the root element in the HTML
createRoot(document.getElementById('root')).render(
  <StrictMode> {/* Lets you find common bugs in your components early during development */}
    <AuthorProvider>
      <App />
    </AuthorProvider>
  </StrictMode>,
)
