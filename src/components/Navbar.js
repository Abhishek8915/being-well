import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-xl font-bold">Logo</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="#1" className="hover:text-gray-200">Menu 1</a>
            <a href="#2" className="hover:text-gray-200">Menu 2</a>

            {/* Dropdown for Menu 3 */}
            <div
              className="relative group"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="hover:text-gray-200">Menu 3</button>
              {dropdownOpen && (
                <div className="absolute bg-blue-700 text-white rounded-md shadow-lg mt-2 py-2 w-32">
                  <a href="#3a" className="block px-4 py-2 hover:bg-blue-500">Submenu 1</a>
                  <a href="#3b" className="block px-4 py-2 hover:bg-blue-500">Submenu 2</a>
                  <a href="#3c" className="block px-4 py-2 hover:bg-blue-500">Submenu 3</a>
                  <a href="#3d" className="block px-4 py-2 hover:bg-blue-500">Submenu 4</a>
                  <a href="#3e" className="block px-4 py-2 hover:bg-blue-500">Submenu 5</a>
                </div>
              )}
            </div>

            <a href="#4" className="hover:text-gray-200">Menu 4</a>
            <a href="#5" className="hover:text-gray-200">Menu 5</a>
            <a href="#6" className="hover:text-gray-200">Menu 6</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 text-white px-4 py-3 space-y-4">
          <a href="#1" className="block hover:text-gray-200">Menu 1</a>
          <a href="#2" className="block hover:text-gray-200">Menu 2</a>

          {/* Dropdown for Menu 3 in Mobile */}
          <div
            className="relative"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <button className="w-full text-left">Menu 3</button>
            {dropdownOpen && (
              <div className="absolute bg-blue-800 text-white rounded-md shadow-lg mt-2 py-2 w-full">
                <a href="#3a" className="block px-4 py-2 hover:bg-blue-500">Submenu 1</a>
                <a href="#3b" className="block px-4 py-2 hover:bg-blue-500">Submenu 2</a>
                <a href="#3c" className="block px-4 py-2 hover:bg-blue-500">Submenu 3</a>
                <a href="#3d" className="block px-4 py-2 hover:bg-blue-500">Submenu 4</a>
                <a href="#3e" className="block px-4 py-2 hover:bg-blue-500">Submenu 5</a>
              </div>
            )}
          </div>

          <a href="#4" className="block hover:text-gray-200">Menu 4</a>
          <a href="#5" className="block hover:text-gray-200">Menu 5</a>
          <a href="#6" className="block hover:text-gray-200">Menu 6</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
