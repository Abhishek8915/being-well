import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaQuoteLeft } from "react-icons/fa";

const API_BASE_URL = "http://localhost:5000/api";

const GratitudeJournal = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [editingEntry, setEditingEntry] = useState(null);
  const [quote, setQuote] = useState({ text: "", author: "" });

  // Fetch gratitude entries
  const fetchEntries = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/gratitude`);
      setEntries(res.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  // Fetch the latest quote
  const fetchQuote = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/quote`);
      setQuote(res.data);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchEntries();
    fetchQuote();
  }, []);

  // Add or update entry
  const handleSaveEntry = async () => {
    try {
      if (editingEntry) {
        // Update existing entry
        const updatedEntries = entries.map((entry) =>
          entry._id === editingEntry._id ? { ...entry, entry: newEntry } : entry
        );
        setEntries(updatedEntries);
        setEditingEntry(null);
      } else {
        // Save new entry
        const res = await axios.post(`${API_BASE_URL}/gratitude`, { entry: newEntry });
        setEntries([res.data, ...entries]);
      }
      setNewEntry("");
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  // Edit an entry
  const handleEditEntry = (entry) => {
    setNewEntry(entry.entry);
    setEditingEntry(entry);
  };

  // Delete an entry
  const handleDeleteEntry = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/gratitude/${id}`);
      setEntries(entries.filter((entry) => entry._id !== id));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white text-gray-800 p-6 rounded-lg shadow-lg"
      >
        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="p-4 text-center bg-indigo-100 rounded-md mb-6"
        >
          <FaQuoteLeft className="text-indigo-500 text-3xl inline-block mb-2" />
          <p className="text-lg font-semibold">{quote.text}</p>
          <p className="text-sm text-gray-600">- {quote.author}</p>
        </motion.div>

        {/* Gratitude Input */}
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="What are you grateful for today?"
            className="flex-1 p-2 rounded-md border focus:outline-none focus:ring focus:ring-indigo-300"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
          />
          <button
            onClick={handleSaveEntry}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
          >
            {editingEntry ? "Update" : "Add"}
          </button>
        </div>

        {/* Gratitude Entries */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          {entries.length > 0 ? (
            entries.map((entry) => (
              <motion.div
                key={entry._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-100 text-gray-800 p-3 rounded-md flex justify-between items-center mb-2 shadow"
              >
                <span>{entry.entry}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditEntry(entry)}
                    className="text-indigo-500 hover:text-indigo-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteEntry(entry._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400 text-center mt-4">No gratitude entries yet.</p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GratitudeJournal;
