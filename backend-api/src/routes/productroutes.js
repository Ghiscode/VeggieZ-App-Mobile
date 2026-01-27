const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Kalau ada yang minta GET /api/products, panggil fungsi ini:
router.get("/", productController.getAllProducts);

module.exports = router;
