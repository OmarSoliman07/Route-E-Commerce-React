import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Compontents/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Brands from './Compontents/Brands/Brands'
import Cart from './Compontents/Cart/Cart'
import Signup from './Compontents/Signup/Signup'
import Login from './Compontents/Login/Login'
import Notfound from './Compontents/Notfound/Notfound'
import Layout from './Compontents/Layout/Layout'
import UpdatePassword from './Compontents/UpdatePassword/UpdatePassword'
import ForgotPassword from './Compontents/ForgotPassword/ForgotPassword'
import AuthContextProvider from './Context/AuthContextProvider' 
import ProductDetails from './Compontents/ProductDetails/ProductDetails'
import ProtectedRouting from './Context/ProtectedRouting'
import CategoryProducts from './Compontents/CategoryProducts/CategoryProducts'
import CategorySliderDetails from './Compontents/CategorySliderDetails/CategorySliderDetails'
import Wishlist from './Compontents/Wishlist/Wishlist'
import CartContextProveder from './Context/CartContextProveder'
import Shipping_Details from './Compontents/Shipping_Details/Shipping_Details'
import allorders from './Compontents/allorders/allorders'
import MyWishlistContextProvider from './Context/MywishListContextProveder'

function App() {
  const [] = useState(0)
  let router = createBrowserRouter([
        {
            path: "",
            element: <Layout />,
            children: [
        { index: true, element:<ProtectedRouting>  <Home />  </ProtectedRouting>   },
        // { path: "product", element: <ProtectedRouting> <Product /> </ProtectedRouting> },
        { path: "ProductDetails/:x/:y", element: <ProtectedRouting> <ProductDetails /> </ProtectedRouting> },
        { path: "category/:id", element: <ProtectedRouting> <CategoryProducts /> </ProtectedRouting> },
        { path: "cart", element: <ProtectedRouting> <Cart /> </ProtectedRouting> },
        { path: "Shipping_Details/:id", element: <ProtectedRouting> <Shipping_Details /> </ProtectedRouting> },
        { path: "allorders", element: <ProtectedRouting> <allorders /> </ProtectedRouting> },
       { path: "CategorySliderDetails/:id", element: <ProtectedRouting> <CategorySliderDetails /> </ProtectedRouting> },
        { path: "Brands", element: <ProtectedRouting> <Brands /> </ProtectedRouting> },
        { path: "Wishlist", element: <ProtectedRouting> <Wishlist /> </ProtectedRouting> },
       
      
        { path: "login", element: <Login />},
        { path: "forgotPassword", element: <ForgotPassword />},
        { path: "updatePassword", element: <UpdatePassword />},
        { path: "Signup", element: <Signup />},
        { path: "*", element: <Notfound />},
      ],
        },
    ]);
    return (
      <AuthContextProvider>
        <MyWishlistContextProvider>
       <CartContextProveder> <RouterProvider router={router} /></CartContextProveder>
       </MyWishlistContextProvider>
      </AuthContextProvider>
  );
}

export default App