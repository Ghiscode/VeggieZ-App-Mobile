const express = require("express");
// PERBAIKAN: Gunakan huruf 'R' besar untuk Router()
const apiRouter = express.Router();

const authController = require("../controllers/authController");

// URL: POST /api/auth/register
apiRouter.post("/register", authController.register);

// URL: POST /api/auth/login
apiRouter.post("/login", authController.login);

module.exports = apiRouter;
