import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Menu from './pages/Menu'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Waiter from './pages/Waiter'
import Cashier from './pages/Cashier'

const router = createBrowserRouter([
  {
    path : "/",
    element: <Menu/>,
    errorElement: <div>404 NOT FOUND</div>

  },
  {
    path : "/login",
    element: <Login/>,
    errorElement: <div>404 NOT FOUND</div>

  },
  {
    path : "/admin",
    element: <Admin/>,
    errorElement: <div>404 NOT FOUND</div>

  },
  {
    path : "/waiter",
    element: <Waiter/>,
    errorElement: <div>404 NOT FOUND</div>

  },
  {
    path : "/cashier",
    element: <Cashier/>,
    errorElement: <div>404 NOT FOUND</div>

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
