// // import React, { useState } from 'react';

// // const Navbar = () => {
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [dropdownOpen, setDropdownOpen] = useState(false);

// //   return (
// //     <nav className="bg-blue-600 text-white">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex items-center justify-between h-16">
// //           {/* Logo */}
// //           <div className="flex-shrink-0 text-xl font-bold">Logo</div>

// //           {/* Desktop Menu */}
// //           <div className="hidden md:flex space-x-6">
// //             <a href="#1" className="hover:text-gray-200">Menu 1</a>
// //             <a href="#2" className="hover:text-gray-200">Menu 2</a>

// //             {/* Dropdown for Menu 3 */}
// //             <div
// //               className="relative group"
// //               onMouseEnter={() => setDropdownOpen(true)}
// //               onMouseLeave={() => setDropdownOpen(false)}
// //             >
// //               <button className="hover:text-gray-200">Menu 3</button>
// //               {dropdownOpen && (
// //                 <div className="absolute bg-blue-700 text-white rounded-md shadow-lg mt-2 py-2 w-32">
// //                   <a href="#3a" className="block px-4 py-2 hover:bg-blue-500">Submenu 1</a>
// //                   <a href="#3b" className="block px-4 py-2 hover:bg-blue-500">Submenu 2</a>
// //                   <a href="#3c" className="block px-4 py-2 hover:bg-blue-500">Submenu 3</a>
// //                   <a href="#3d" className="block px-4 py-2 hover:bg-blue-500">Submenu 4</a>
// //                   <a href="#3e" className="block px-4 py-2 hover:bg-blue-500">Submenu 5</a>
// //                 </div>
// //               )}
// //             </div>

// //             <a href="#4" className="hover:text-gray-200">Menu 4</a>
// //             <a href="#5" className="hover:text-gray-200">Menu 5</a>
// //             <a href="#6" className="hover:text-gray-200">Menu 6</a>
// //           </div>

// //           {/* Mobile Menu Button */}
// //           <div className="md:hidden">
// //             <button
// //               onClick={() => setMenuOpen(!menuOpen)}
// //               className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
// //             >
// //               <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
// //               </svg>
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Mobile Menu */}
// //       {menuOpen && (
// //         <div className="md:hidden bg-blue-700 text-white px-4 py-3 space-y-4">
// //           <a href="#1" className="block hover:text-gray-200">Menu 1</a>
// //           <a href="#2" className="block hover:text-gray-200">Menu 2</a>

// //           {/* Dropdown for Menu 3 in Mobile */}
// //           <div
// //             className="relative"
// //             onClick={() => setDropdownOpen(!dropdownOpen)}
// //           >
// //             <button className="w-full text-left">Menu 3</button>
// //             {dropdownOpen && (
// //               <div className="absolute bg-blue-800 text-white rounded-md shadow-lg mt-2 py-2 w-full">
// //                 <a href="#3a" className="block px-4 py-2 hover:bg-blue-500">Submenu 1</a>
// //                 <a href="#3b" className="block px-4 py-2 hover:bg-blue-500">Submenu 2</a>
// //                 <a href="#3c" className="block px-4 py-2 hover:bg-blue-500">Submenu 3</a>
// //                 <a href="#3d" className="block px-4 py-2 hover:bg-blue-500">Submenu 4</a>
// //                 <a href="#3e" className="block px-4 py-2 hover:bg-blue-500">Submenu 5</a>
// //               </div>
// //             )}
// //           </div>

// //           <a href="#4" className="block hover:text-gray-200">Menu 4</a>
// //           <a href="#5" className="block hover:text-gray-200">Menu 5</a>
// //           <a href="#6" className="block hover:text-gray-200">Menu 6</a>
// //         </div>
// //       )}
// //     </nav>
// //   );
// // };

// // export default Navbar;


// import React from 'react';
// import { Link } from 'react-router-dom';

// function Navbar() {
//   return (
//     <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
//       <div className="container mx-auto px-6 py-3 flex justify-between items-center">
//         {/* Brand Logo */}
//         <h1 className="text-3xl font-bold text-blue-400 hover:text-blue-500 transition duration-300">
//           <Link to="/">MyApp</Link>
//         </h1>

//         {/* Navbar Links */}
//         <ul className="flex items-center gap-6 text-lg">
//           <li>
//             <Link 
//               to="/" 
//               className="relative px-4 py-2 before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-blue-400 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100"
//             >
//               Home
//             </Link>
//           </li>

//           <li>
//             <Link 
//               to="/challenges" 
//               className="relative px-4 py-2 before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-blue-400 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100"
//             >
//               Challenges
//             </Link>
//           </li>

//           {/* Features Dropdown */}
//           <li className="relative group">
//             <button className="relative px-4 py-2 transition-colors duration-300 hover:text-blue-400">
//               Features
//             </button>
//             <ul className="absolute left-0 mt-3 w-52 bg-gray-800 text-white rounded-md shadow-lg opacity-0 transform scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
//               <li><Link to="/gratitude-journal" className="block px-4 py-2 hover:bg-blue-600">Gratitude Journal</Link></li>
//               <li><Link to="/pomodoro-timer" className="block px-4 py-2 hover:bg-blue-600">Pomodoro Timer</Link></li>
//               <li><Link to="/reading" className="block px-4 py-2 hover:bg-blue-600">Reading</Link></li>
//               <li><Link to="/meditation" className="block px-4 py-2 hover:bg-blue-600">Meditation</Link></li>
//               <li><Link to="/to-do" className="block px-4 py-2 hover:bg-blue-600">To-Do</Link></li>
//             </ul>
//           </li>

//           <li>
//             <Link 
//               to="/community" 
//               className="relative px-4 py-2 before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-blue-400 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100"
//             >
//               Community
//             </Link>
//           </li>

//           <li>
//             <Link 
//               to="/progress" 
//               className="relative px-4 py-2 before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-blue-400 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100"
//             >
//               Progress
//             </Link>
//           </li>

//           <li>
//             <Link 
//               to="/profile" 
//               className="relative px-4 py-2 before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-blue-400 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100"
//             >
//               Profile
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">MyApp</Link>
        
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
