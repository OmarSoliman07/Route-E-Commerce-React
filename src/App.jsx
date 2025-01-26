import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Compontents/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Product from './Compontents/Product/Product'
import Cart from './Compontents/Cart/Cart'
import Signup from './Compontents/Signup/Signup'
import Login from './Compontents/Login/Login'
import Notfound from './Compontents/Notfound/Notfound'
import Layout from './Compontents/Layout/Layout'

function App() {
  const [count, setCount] = useState(0)
  let router= createBrowserRouter([
    {path: '',element:<Layout/>,children:[
      {index:true,element:<Home/>},
      {path:"product",element:<Product/>},
      {path:"cart",element:<Cart/>},
      {path:"login",element:<Login/>},
      {path:"signup",element:<Signup/>},
      {path:"**",element:<Notfound/>},
    ]}
  ])
  return (
    <>
    <RouterProvider router={router}></RouterProvider>

    </>
  )
}

export default App
