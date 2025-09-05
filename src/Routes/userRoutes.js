// src/Routes/userRoutes.js
const express = require("express");
const UserController = require("../controllers/usercontroller.js");
const router = express.Router();

// Create user
router.post("/", UserController.createUser);

// Get user by ID
router.get("/:id", UserController.getUserById);

// Get all users
router.get("/", UserController.getAllUsers);

// Delete user
router.delete("/:id", UserController.deleteUser);

module.exports = router;
