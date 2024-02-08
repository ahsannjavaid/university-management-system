const mongoose = require("mongoose");

const DB = process.env.DATABASE_CONNECTION_STRING;

try {
    mongoose.connect(DB);
    console.log("Database connected!");
} catch (error) {
    console.error("Failed to connect database.", error);
}
