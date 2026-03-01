import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext.tsx'
import { TodoProvider } from './contexts/TodoContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodoProvider>
    <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </UserProvider>
    </TodoProvider>
  </StrictMode>,
)
