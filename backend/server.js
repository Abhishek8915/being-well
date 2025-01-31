require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const cron = require("node-cron");
const multer = require("multer");
const path = require("path");

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

// Gratitude Schema and Model
const GratitudeSchema = new mongoose.Schema({
  entry: String,
  date: { type: Date, default: Date.now },
});
const Gratitude = mongoose.model("Gratitude", GratitudeSchema);

// Quote Schema and Model
const QuoteSchema = new mongoose.Schema({
  text: String,
  author: String,
  fetchedAt: { type: Date, default: Date.now },
});
const Quote = mongoose.model("Quote", QuoteSchema);

// Book Schema and Model
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  bookType: { type: String, enum: ['fiction', 'non-fiction', 'biography', 'science', 'history'], required: true },
  publicationDate: { type: Date, required: true },
  file: { type: String, required: true }, // URL to the uploaded book file (e.g., PDF or ePub)
}, { timestamps: true });
const Book = mongoose.model("Book", bookSchema);

// File Storage Setup for Book Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

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

// Route: Get All Gratitude Entries
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

// Route: Upload Book
app.post("/api/books/upload", upload.single("book"), async (req, res) => {
  const { title, author, description, bookType, publicationDate } = req.body;
  const file = req.file;

  try {
    const newBook = new Book({
      title,
      author,
      description,
      bookType,
      publicationDate,
      file: file.path,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Error uploading book" });
  }
});

// Route: Search Books
app.get("/api/books/search", async (req, res) => {
  const query = req.query.q;
  const filter = req.query.filter;

  const conditions = filter ? { bookType: filter } : {};

  try {
    const books = await Book.find(conditions)
      .where("title")
      .regex(query, "i") // Case insensitive search
      .or([{ author: new RegExp(query, "i") }]);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error fetching books" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  fetchQuote(); // Fetch first quote on startup
});
