import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LogoImg from "../../assets/images/freshcart-logo (1).png";
import { AuthContext } from "../../Context/AuthContextProvider";
import "./Navbar.css";

export default function Navbar() {
  const { token, setToken, userData } = useContext(AuthContext);
  const nav = useNavigate();

  // حالة الثيم (Light / Dark)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // حالة فتح القائمة في الموبايل

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    nav("/login");
  }

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 shadow-md">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        
        {/* 👇 اللوجو */}
       <div> <Link to="/" className="flex items-center space-x-3">
          <img src={LogoImg} className="h-8" alt="Logo" />
          <p className="Logo-Tilte ms-0">FreshCart</p>
        </Link></div>
        
        {/* 🌟 زر القائمة في الموبايل */}
        <button
          className="ml-auto md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 "
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* ✅ القائمة في الديسكتوب */}
       <ul className="md:ml-auto hidden md:flex items-center space-x-4">
  {token && (
    <>
      <li>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `hover:text-green-500 dark:hover:text-green-300 ${isActive ? "text-green-500 dark:text-green-400 font-semibold" : "text-gray-900 dark:text-gray-100"}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/Product" 
          className={({ isActive }) => 
            `hover:text-green-500 dark:hover:text-green-300 ${isActive ? "text-green-500 dark:text-green-400 font-semibold" : "text-gray-900 dark:text-gray-100"}`
          }
        >
          Products
        </NavLink>
      </li>
    </>
  )}
  {token && (
    <li>
      <NavLink 
        to="/Cart" 
        className={({ isActive }) => 
          `hover:text-green-500 dark:hover:text-green-300 ${isActive ? "text-green-500 dark:text-green-400 font-semibold" : "text-gray-900 dark:text-gray-100"}`
        }
      >
        Cart
      </NavLink>
    </li>
  )}
</ul>

        {/* 🌙 زر تبديل الثيم */}
        <button className="md:ml-auto md:me-4 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* 🔴 تسجيل الدخول والخروج */}
        <div className="hidden md:flex items-center space-x-4">
          {token ? (
            <>
              <span className="text-green-500 font-semibold">Hello, {userData?.name || "User"}</span>
              <button className="text-red-500 hover:underline" onClick={logout}>Log Out</button>
            </>
          ) : (
            <>
              <NavLink 
                to="/login" 
                className={({ isActive }) => 
                  `hover:text-green-500 ${isActive ? "text-green-500 dark:text-green-400 font-semibold" : "text-gray-900 dark:text-gray-100"}`
                }
              >
                Login
              </NavLink>
              <NavLink 
                to="/signup" 
                className={({ isActive }) => 
                  `hover:text-green-500 ${isActive ? "text-green-500 dark:text-green-400 font-semibold" : "text-gray-900 dark:text-gray-100"}`
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* ✅ القائمة في الموبايل */}
      {isMenuOpen && (
  <div className="md:hidden border-t border-gray-300 pt-3 mt-3">
    <ul className="flex flex-col p-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      {token && (
        <>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `block py-2 px-3 hover:text-green-500  dark:hover:text-green-300 ${isActive ? "text-green-500 dark:text-green-400 font-semibold" : "text-gray-900 dark:text-white"}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/Product" 
              className={({ isActive }) => 
                `block py-2 px-3 hover:text-green-500 dark:hover:text-green-300 ${isActive ? "text-green-500 dark:text-green-400 font-semibold" : "text-gray-900 dark:text-white"}`
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/Cart" 
              className={({ isActive }) => 
                `block py-2 px-3 hover:text-green-500  dark:hover:text-green-300 ${isActive ? "text-green-500 dark:text-green-400 font-semibold" : "text-gray-900 dark:text-white"}`
              }
            >
              Cart
            </NavLink>
          </li>
          <span className="block text-green-500 font-bold text-center mt-3">Hello, {userData?.name || "User"}</span>
          <span className=" decoration-transparent block text-center mt-2 cursor-pointer text-red-500" onClick={logout}>Log Out</span>
        </>
      )}
    </ul>
  </div>
)}
    </nav>
  );
}
