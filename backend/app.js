require('dotenv').config({ path: '../.env' }); // Load env vars

const express = require("express");
const app = express();
const cors = require("cors");

// CORS setup to allow both local and deployed frontend
const allowedOrigins = [
  'http://localhost:3000',
  'https://todo-list-mu-jet-77.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// Connect DB
const connectToDB = require("./conn/conn");
const auth = require("./routes/auth");

app.get("/", (req, res) => {
  res.send("working");
});

app.use("/api/v1", auth);

// Use env PORT or fallback to 1000
const PORT = process.env.PORT || 1000;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
});
