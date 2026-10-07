const mongoose = require("mongoose");
const dns = require("dns");

async function connectDB() {
  try {
    try {
      dns.setServers(["1.1.1.1", "8.8.8.8"]);
    } catch (e) {}
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
}

module.exports = connectDB;
