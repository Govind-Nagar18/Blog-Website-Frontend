import React, { useState, useEffect } from "react";
import { Search, User, Home, Film, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import useDebounce from "../Hooks/useDebounce";

export default function Navbar({setSearchValue}) {
  let [InputValue, setInputValue] = useState('')
  let debounceSearch = useDebounce(InputValue, 500)

  const [isOpen, setIsOpen] = useState(false);
  let token = localStorage.getItem("token");

  useEffect(()=> {
    setSearchValue(debounceSearch);
  },[debounceSearch])


  return (
    <header className="bg-white text-gray-800 shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Logo Section */}
        <div className="text-2xl font-extrabold text-blue-600 hover:scale-105 transition-transform">
          <Link to="/">BlogApp</Link>
        </div>

        {/* Search Section (hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-2">
          <input
            type="text"
            value={InputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search here..."
            className="rounded-full px-4 py-1 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button className="hover:scale-110 transition-transform text-blue-600">
            <Search size={20} />
          </button>
        </div>

        {/* Hamburger Menu (mobile) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu Section */}
        <ul
          className={`md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-500 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li className="hover:bg-blue-50 p-3 rounded-md transition-all">
            <Link
              to="/"
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
            >
              <Home size={20} /> <span>Home</span>
            </Link>
          </li>
          <li className="hover:bg-blue-50 p-3 rounded-md transition-all">
            <Link
              to="/feed"
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
            >
              <Film size={20} /> <span>Feed</span>
            </Link>
          </li>

          {
            token ? (
              <li className="hover:bg-blue-50 p-3 rounded-md transition-all">
            <Link
              to="/profile"
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
            >
              <User size={20} /> <span>Profile</span>
            </Link>
          </li>
            ):(
              <li className="hover:bg-blue-50 p-3 rounded-md transition-all">
            <Link
              to="/authorization"
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
            >
              <User size={20} /> <span>Signup</span>
            </Link>
          </li>
            )
          }
          
        </ul>
      </nav>
    </header>
  );
}
