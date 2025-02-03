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
import UpdatePassword from './Compontents/UpdatePassword/UpdatePassword'
import ForgotPassword from './Compontents/ForgotPassword/ForgotPassword'
import AuthContextProvider from './Context/AuthContextProvider' 
import ProductDetails from './Compontents/ProductDetails/ProductDetails'

function App() {
  const [] = useState(0)
  let router = createBrowserRouter([
        {
            path: "",
            element: <Layout />,
            children: [
        { index: true, element: <Home />  },
        { path: "product", element: <Product /> },
        { path: "ProductDetails/:x/:y", element: <ProductDetails /> },
        { path: "cart", element: <Cart /> },
        // { path: "category", element: <Category /> },
        // { path: "brands", element: <Brands /> },
        { path: "login", element: <Login />},
        { path: "forgotPassword", element: <ForgotPassword />},
        { path: "updatePassword", element: <UpdatePassword />},
        { path: "Signup", element: <Signup />},
        { path: "", element: <Notfound />},
      ],
        },
    ]);
    return (
      <AuthContextProvider> {/* Wrap with AuthContextProvider */}
        <RouterProvider router={router} />
      </AuthContextProvider>
  );
}

export default App