import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { FavouritesProvider } from './context/FavouritesContext'
import { ThemeProvider } from './context/ThemeContext'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <FavouritesProvider>
        <App />
      </FavouritesProvider>
    </ThemeProvider>
  </React.StrictMode>
)
