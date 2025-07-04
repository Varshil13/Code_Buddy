// backend/server.js
const express = require('express');
const cors = require('cors');
const quizRoutes = require("./routes/quizRoutes.js")
const connectToDatabase = require('./connect');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes.js");

require('dotenv').config();

const app = express();

// CORS should be the first middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://code-buddy-frontend.onrender.com"
  ],
  credentials: true,
}));


// Handle preflight requests for all routes (Express expects a path, not a full URL)
app.options('*', cors());

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", quizRoutes);


const PORT = process.env.PORT || 5000;




connectToDatabase(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
