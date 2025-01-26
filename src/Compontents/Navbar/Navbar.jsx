import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import LogoImg from'../../assets/images/freshcart-logo.svg'

export default function Navbar() {
  return (
    

<nav className="bg-white border-gray-200 dark:bg-gray-900 shadow">
  <div className="max-w-screen-xl flex flex-wrap items-center n mx-auto p-4">
    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={LogoImg} className="h-8" alt="Flowbite Logo" />
        {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> */}
    </Link>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row  rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <NavLink to="/" className={(x)=>x.isActive ? "block py-2 px-3 dark:text-white md:dark:text-blue-500 text-active" : "block py-2 px-3 dark:text-white"} aria-current="page">Home</NavLink>
        </li>
        <li>
          <NavLink to="/Product" className={(x)=>x.isActive ? "block py-2 px-3 dark:text-white md:dark:text-blue-500 text-active" : "block py-2 px-3 dark:text-white"} aria-current="page">products</NavLink>
        </li>
        <li>
          <NavLink to="/Cart" className={(x)=>x.isActive ? "block py-2 px-3 dark:text-white md:dark:text-blue-500 text-active" : "block py-2 px-3 dark:text-white"} aria-current="page">cart</NavLink>
        </li>
        <li>
          <NavLink to="#" className={(x)=>x.isActive ? "block py-2 px-3 dark:text-white md:dark:text-blue-500 text-active" : "block py-2 px-3 dark:text-white"} aria-current="page">brand</NavLink>
        </li>
        <li>
          <NavLink to="#" className={(x)=>x.isActive ? "block py-2 px-3 dark:text-white md:dark:text-blue-500 text-active" : "block py-2 px-3 dark:text-white"} aria-current="page">category</NavLink>
        </li>
        <li>
          <NavLink to="/Login" className={(x)=>x.isActive ? "block py-2 px-3 dark:text-white md:dark:text-blue-500 text-active" : "block py-2 px-3 dark:text-white"} aria-current="page">Login</NavLink>
        </li>
        <li>
          <NavLink to="/signup" className={(x)=>x.isActive ? "block py-2 px-3 dark:text-white md:dark:text-blue-500 text-active" : "block py-2 px-3 dark:text-white"} aria-current="page">Resgister</NavLink>
        </li>
      
      </ul>
    </div>
  </div>
</nav>

  )
}
