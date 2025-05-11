const path = require('path');

// Resolve the absolute path to the .env file
const envPath = path.resolve(__dirname, '../../.env');

require('dotenv').config({ path: envPath });

const mongoose = require("mongoose");

const conn = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

conn();
