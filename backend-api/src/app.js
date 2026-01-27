const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");

dotenv.config(); // Load .env

const app = express();

// Middleware
app.use(cors()); // Biar bisa diakses dari HP/Frontend
app.use(express.json()); // Biar bisa baca JSON dari body request


// Import Routes
const authRoutes = require("./routes/authRoutes");

// Gunakan Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Route Test Sederhana
app.get("/", (req, res) => {
  res.send("Server VeggieZ is Active!");
});

// Jalankan Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test Local: http://localhost:${PORT}`);
});
