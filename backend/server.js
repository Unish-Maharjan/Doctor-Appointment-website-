const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const newsRoutes = require("./routes/newsRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/news", newsRoutes);

app.get("/", function (req, res) {
  res.send("Meddical API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});
