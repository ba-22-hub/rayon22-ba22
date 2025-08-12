// Importing dependencies
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import { useLocation } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'


import { AuthorProvider } from './context/AuthorContext'

// Importing styles
import './styles/index.css'

// Importing the main app component
import Root from './Root.jsx'
import { CartProvider } from './context/CartContext.jsx'

// Creating the root element in the HTML
createRoot(document.getElementById('root')).render(
  <StrictMode> {/* Lets you find common bugs in your components early during development */}
    <AuthorProvider>
      <CartProvider>
        <Root />
      </CartProvider>
    </AuthorProvider>
  </StrictMode>,
)
