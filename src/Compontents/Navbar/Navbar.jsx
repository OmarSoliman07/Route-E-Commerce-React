import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LogoImg from "../../assets/images/freshcart-logo.svg";
import { AuthContext } from "../../Context/AuthContextProvider";

export default function Navbar() {
  let { token, setToken, userData } = useContext(AuthContext);
  let nav = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    nav("/login");
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={LogoImg} className="h-8" alt="Logo" />
        </Link>

        <button
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        {/* عرض الروابط فقط إذا كان المستخدم مسجلاً الدخول */}
        {token && (
          <div className="hidden md:flex md:items-center md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col md:flex-row p-4 md:p-0 mt-4 md:mt-0 border border-gray-100 rounded-lg bg-gray-50 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 md:space-x-4">
              <li>
                <NavLink to="/" className="block py-2 px-3 text-gray-900 dark:text-white">Home</NavLink>
              </li>
              <li>
                <NavLink to="/Product" className="block py-2 px-3 text-gray-900 dark:text-white">Products</NavLink>
              </li>
              <li>
                <NavLink to="/Cart" className="block py-2 px-3 text-gray-900 dark:text-white">Cart</NavLink>
              </li>
            </ul>
          </div>
        )}

        <div className="hidden md:flex items-center space-x-4">
          {token ? (
            <>
              <span className="text-green-500 font-bold">Hello, {userData?.name || "User"}</span>
              <span className="cursor-pointer text-red-500" onClick={logout}>Log Out</span>
            </>
          ) : (
            <>
              <NavLink to="/Login" className="py-2 px-3 text-gray-900 dark:text-white">Login</NavLink>
              <NavLink to="/signup" className="py-2 px-3 text-gray-900 dark:text-white">Register</NavLink>
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-300 pt-3 mt-3">
          <ul className="font-medium flex flex-col p-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            {token ? (
              <>
                <li>
                  <NavLink to="/" className="block py-2 px-3 text-gray-900 dark:text-white">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/Product" className="block py-2 px-3 text-gray-900 dark:text-white">Products</NavLink>
                </li>
                <li>
                  <NavLink to="/Cart" className="block py-2 px-3 text-gray-900 dark:text-white">Cart</NavLink>
                </li>
                <span className="block text-green-500 font-bold text-center mt-3">Hello, {userData?.name || "User"}</span>
                <span className="block text-center mt-2 cursor-pointer text-red-500" onClick={logout}>Log Out</span>
              </>
            ) : (
              <>
                <NavLink to="/Login" className="block py-2 px-3 text-gray-900 dark:text-white text-center">Login</NavLink>
                <NavLink to="/signup" className="block py-2 px-3 text-gray-900 dark:text-white text-center">Register</NavLink>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
