import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import SendMoney from './pages/SendMoney.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement:<div>404</div>
  },
  {
    path:'/Dashboard',
    element:<Dashboard/>,
    errorElement:<div>404</div>
  },
  {
    path:'/SendMoney',
    element:<SendMoney/>,
    errorElement:<div>404</div>
  },
  {
    path:'/Signin',
    element:<Signin/>,
    errorElement:<div>404</div>
  },
  {
    path:'Signup',
    element:<Signup/>,
    errorElement:<div>404</div>
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
