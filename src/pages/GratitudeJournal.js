// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { FaEdit, FaTrash, FaQuoteLeft } from "react-icons/fa";
// import { CSVLink } from "react-csv";  // Adding CSV export functionality

// const API_BASE_URL = "http://localhost:5000/api";

// const GratitudeJournal = () => {
//   const [entries, setEntries] = useState([]);
//   const [newEntry, setNewEntry] = useState("");
//   const [editingEntry, setEditingEntry] = useState(null);
//   const [quote, setQuote] = useState({ text: "", author: "" });

//   // Fetch gratitude entries
//   const fetchEntries = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/gratitude`);
//       setEntries(res.data);
//     } catch (error) {
//       console.error("Error fetching entries:", error);
//     }
//   };

//   // Fetch the latest quote
//   const fetchQuote = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/quote`);
//       setQuote(res.data);
//     } catch (error) {
//       console.error("Error fetching quote:", error);
//     }
//   };

//   useEffect(() => {
//     fetchEntries();
//     fetchQuote();
//   }, []);

//   // Add or update entry
//   const handleSaveEntry = async () => {
//     try {
//       if (editingEntry) {
//         // Update existing entry
//         const updatedEntries = entries.map((entry) =>
//           entry._id === editingEntry._id ? { ...entry, entry: newEntry } : entry
//         );
//         setEntries(updatedEntries);
//         setEditingEntry(null);
//       } else {
//         // Save new entry
//         const res = await axios.post(`${API_BASE_URL}/gratitude`, { entry: newEntry });
//         setEntries([res.data, ...entries]);
//       }
//       setNewEntry("");
//     } catch (error) {
//       console.error("Error saving entry:", error);
//     }
//   };

//   // Edit an entry
//   const handleEditEntry = (entry) => {
//     setNewEntry(entry.entry);
//     setEditingEntry(entry);
//   };

//   // Delete an entry
//   const handleDeleteEntry = async (id) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/gratitude/${id}`);
//       setEntries(entries.filter((entry) => entry._id !== id));
//     } catch (error) {
//       console.error("Error deleting entry:", error);
//     }
//   };

//   // Prepare data for CSV export
//   const csvData = entries.map(entry => ({
//     Entry: entry.entry,
//     Date: entry.date,
//   }));

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-3xl mx-auto bg-white text-gray-800 p-6 rounded-lg shadow-lg"
//       >
//         {/* Quote Section */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1 }}
//           className="p-4 text-center bg-indigo-100 rounded-md mb-6"
//         >
//           <FaQuoteLeft className="text-indigo-500 text-3xl inline-block mb-2" />
//           <p className="text-lg font-semibold">{quote.text}</p>
//           <p className="text-sm text-gray-600">- {quote.author}</p>
//         </motion.div>

//         {/* Gratitude Input */}
//         <div className="flex items-center space-x-3">
//           <input
//             type="text"
//             placeholder="What are you grateful for today?"
//             className="flex-1 p-2 rounded-md border focus:outline-none focus:ring focus:ring-indigo-300"
//             value={newEntry}
//             onChange={(e) => setNewEntry(e.target.value)}
//           />
//           <button
//             onClick={handleSaveEntry}
//             className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
//           >
//             {editingEntry ? "Update" : "Add"}
//           </button>
//         </div>

//         {/* Gratitude Entries */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mt-6"
//         >
//           {entries.length > 0 ? (
//             entries.map((entry) => (
//               <motion.div
//                 key={entry._id}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-gray-100 text-gray-800 p-3 rounded-md flex justify-between items-center mb-2 shadow"
//               >
//                 <span>{entry.entry}</span>
//                 <div className="space-x-2">
//                   <button
//                     onClick={() => handleEditEntry(entry)}
//                     className="text-indigo-500 hover:text-indigo-700"
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteEntry(entry._id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//               </motion.div>
//             ))
//           ) : (
//             <p className="text-gray-400 text-center mt-4">No gratitude entries yet.</p>
//           )}
//         </motion.div>

//         {/* Export to CSV */}
//         <div className="mt-6 text-center">
//           <CSVLink
//             data={csvData}
//             filename="gratitude_entries.csv"
//             className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
//           >
//             Export to CSV
//           </CSVLink>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default GratitudeJournal;


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import { div } from "framer-motion/client";

const predefinedQuotes = [
  { text: "Gratitude turns what we have into enough.", author: "Anonymous" },
  { text: "The more grateful I am, the more beauty I see.", author: "Mary Davis" },
  { text: "Start each day with a positive thought and a grateful heart.", author: "Roy T. Bennett" },
  { text: "Happiness is itself a kind of gratitude.", author: "Joseph Wood Krutch" },
  { text: "Gratitude is the fairest blossom that springs from the soul.", author: "Henry Ward Beecher" }
];

// Function to format date in "3:40 AM on August 4, 33" format
const formatDate = (date) => {
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    day: "numeric",
    month: "long",
    year: "2-digit",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const GratitudeJournal = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [userQuotes, setUserQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState("");

  useEffect(() => {
    getRandomQuote();
    loadUserQuotes();
  }, []);

  const loadUserQuotes = () => {
    const savedQuotes = localStorage.getItem("userQuotes");
    if (savedQuotes) {
      setUserQuotes(JSON.parse(savedQuotes));
    }
  };

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * predefinedQuotes.length);
    setQuote(predefinedQuotes[randomIndex]);
  };

  const handleAddQuote = () => {
    if (newQuote.trim() !== "") {
      const formattedDate = formatDate(new Date());
      const addedQuote = { text: newQuote, author: "User", date: formattedDate };
      const updatedQuotes = [addedQuote, ...userQuotes];

      setUserQuotes(updatedQuotes);
      localStorage.setItem("userQuotes", JSON.stringify(updatedQuotes));
      setNewQuote("");
    }
  };

  return (
   

    <div className="min-h-screen p-12 text-white bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration:  0.6}}
        className="max-w-4xl mx-auto bg-white text-gray-800 p-10 rounded-2xl shadow-xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="p-6 text-center rounded-md mb-8 text-xl"
        >
          <FaQuoteLeft className="text-indigo-500 text-5xl inline-block mb-4" />
          <p className="font-semibold text-2xl">{quote.text}</p>
          <p className="text-lg text-gray-600">- {quote.author}</p>
        </motion.div>

        {/* User Quote Input */}
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="What are you grateful for today?"
            className="flex-1 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 text-lg"
            value={newQuote}
            onChange={(e) => setNewQuote(e.target.value)}
          />
          <button
            onClick={handleAddQuote}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg"
          >
            Add
          </button>
        </div>

        {/* Display user-added quotes in a horizontal scrolling container */}
        {userQuotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 bg-gray-100 p-6 rounded-md text-gray-800 shadow-md"
          >
            <h3 className="text-xl font-bold mb-4">You are grateful for :</h3>

            {/* Horizontal Scrollable Container */}
            <div className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide p-2">
              {userQuotes.map((q, index) => (
                <div
                  key={index}
                  className="relative min-w-[300px] p-4 bg-indigo-100 rounded-xl shadow-lg flex flex-col justify-between"
                >
                  <p className="text-lg font-semibold">"{q.text}"</p>

                  {/* Date at bottom-right */}
                  <p className="text-gray-500 text-sm self-end mt-2">{q.date}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>

  );
};

export default GratitudeJournal;