require('dotenv').config({ path: '../.env' }); // ✅ Required to load .env

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const connectToDB = require("./conn/conn"); // ⬅️ import the function, not run it yet
const auth = require("./routes/auth");

app.get("/", (req, res) => {
    res.send("working");
});

app.use("/api/v1", auth);

// Connect DB first, then start server
connectToDB().then(() => {
    app.listen(1000, () => {
        console.log("listening on http://localhost:1000");
    });
});
