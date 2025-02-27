import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SettingsProvider from './context/SettingContext.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './pages/Homepage.tsx'
import PlayGround from './pages/PlayGround.tsx'
import AuthProvider from './context/AuthContext.tsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Homepage/>
  },
  {
    path:'/playground',
    element:<PlayGround/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <SettingsProvider>
      <RouterProvider router={router}/>
    </SettingsProvider>
    </AuthProvider>
  </StrictMode>,
)
