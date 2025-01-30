// import React, { useState, useEffect } from "react";

// const HeroSection = () => {
//   const [quote, setQuote] = useState("");
//   const [author, setAuthor] = useState("");

//   // Fetching the quote from API
//   useEffect(() => {
//     const fetchQuote = async () => {
//         try {
//           const response = await fetch("https://zenquotes.io/api/quotes");
//           if (!response.ok) {
//             throw new Error(`Error: ${response.status} ${response.statusText}`);
//           }
//           const data = await response.json();
//           setQuote(data.content);
//           setAuthor(data.author);
//         } catch (error) {
//           console.error("Failed to fetch the quote:", error);
//           setQuote("Failed to fetch the quote. Please try again later.");
//           setAuthor("");
//         }
//     };
      
//     fetchQuote();
//   }, []);

//   return (
//     <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white p-6">
//       <div className="text-center max-w-2xl shadow-lg bg-white rounded-2xl p-8 text-gray-800">
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">
//           Quote of the Day
//         </h1>
//         {quote ? (
//           <div>
//             <p className="text-2xl md:text-3xl italic font-medium mb-6">
//               "{quote}"
//             </p>
//             <p className="text-lg md:text-xl font-semibold text-right">
//               - {author}
//             </p>
//           </div>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HeroSection;


// using python as a backend

// import React, { useEffect, useState } from "react";

// const HeroSection = () => {
//     const [quote, setQuote] = useState("Loading...");

//     useEffect(() => {
//         fetch("http://localhost:5000/get-quote")  // Fetch from Python backend
//             .then((response) => response.json())
//             .then((data) => {
//                 setQuote(data[0].q + " — " + data[0].a); // Format: "Quote - Author"
//             })
//             .catch((error) => {
//                 console.error("Error fetching quote:", error);
//                 setQuote("Failed to load quote.");
//             });
//     }, []);

//     return (
//         <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white text-3xl font-bold p-10 text-center">
//             <blockquote className="max-w-2xl italic">❝ {quote} ❞</blockquote>
//         </div>
//     );
// };

// export default HeroSection;

import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
      <p className="text-lg mb-6">
        Your daily source of inspiration. Stay motivated with fresh quotes every day!
      </p>

      {/* Buttons for Login and Signup */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-lg transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-lg transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
