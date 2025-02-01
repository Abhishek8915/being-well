
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">ZenFlow</Link>
        
        <div className="flex space-x-6">
          <Link to="/" className="text-white hover:underline">Home</Link>
          <Link to="/challenges" className="text-white hover:underline">Challenges</Link>
          
          {/* Features Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-white hover:underline"
            >
              Features ▾
            </button>
            {dropdownOpen && (
              <div className="absolute mt-2 bg-white text-black shadow-lg p-2 rounded-lg">
                <Link to="/gratitude-journal" className="block px-4 py-2 hover:bg-gray-200">Gratitude Journal</Link>
                <Link to="/pomodoro-timer" className="block px-4 py-2 hover:bg-gray-200">Pomodoro Timer</Link>
                <Link to="/reading" className="block px-4 py-2 hover:bg-gray-200">Reading</Link>
                <Link to="/meditation" className="block px-4 py-2 hover:bg-gray-200">Meditation</Link>
                <Link to="/todo" className="block px-4 py-2 hover:bg-gray-200">To-Do</Link>
                <Link to="/habit-replacer" className="block px-4 py-2 hover:bg-gray-200">Habit Replacer</Link>
              </div>
            )}
          </div>

          <Link to="/community" className="text-white hover:underline">Community</Link>
          <Link to="/progress" className="text-white hover:underline">Progress</Link>
          <Link to="/profile" className="text-white hover:underline">Profile</Link>
          <Link to="/signup" className="text-white border px-3 py-1 rounded-md hover:bg-white hover:text-blue-600">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
