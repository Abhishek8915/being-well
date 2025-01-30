require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const cron = require("node-cron");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schema
const GratitudeSchema = new mongoose.Schema({
  entry: String,
  date: { type: Date, default: Date.now },
});

const QuoteSchema = new mongoose.Schema({
  text: String,
  author: String,
  fetchedAt: { type: Date, default: Date.now },
});

const Gratitude = mongoose.model("Gratitude", GratitudeSchema);
const Quote = mongoose.model("Quote", QuoteSchema);

// Route: Save Gratitude Entry
app.post("/api/gratitude", async (req, res) => {
  try {
    const newEntry = new Gratitude({ entry: req.body.entry });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: "Error saving entry" });
  }
});

// Route: Get All Entries
app.get("/api/gratitude", async (req, res) => {
  try {
    const entries = await Gratitude.find().sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Error fetching entries" });
  }
});

// Fetch Motivational Quotes API
const fetchQuote = async () => {
  try {
    const response = await axios.get("https://api.quotable.io/random");
    const { content, author } = response.data;
    
    // Store in DB
    const newQuote = new Quote({ text: content, author });
    await newQuote.save();
  } catch (error) {
    console.error("Error fetching quote:", error.message);
  }
};

// Route: Get Latest Quote
app.get("/api/quote", async (req, res) => {
  try {
    const latestQuote = await Quote.findOne().sort({ fetchedAt: -1 });
    res.json(latestQuote);
  } catch (error) {
    res.status(500).json({ error: "Error fetching quote" });
  }
});

// Cron Job: Fetch Quote Every 8 Hours
cron.schedule("0 */8 * * *", fetchQuote);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  fetchQuote(); // Fetch first quote on startup
});

