require('dotenv').config(); // No custom path needed

const express = require("express");
const app = express();
const cors = require("cors");

const allowedOrigins = [
  'https://todo-list-2-d394.onrender.com',
  'https://todo-list-mu-jet-77.vercel.app'  // ✅ No slash
];


app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

const connectToDB = require("./conn/conn");
const auth = require("./routes/auth");

app.get("/", (req, res) => {
  res.send("working");
});

app.use("/api/v1", auth);

// ✅ Correct: use Render-assigned port or fallback
const PORT = process.env.PORT || 1000;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
});
