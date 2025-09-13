// src/Routes/userRoutes.js
const express = require("express");
const UserController = require("../controllers/usercontroller.js");
const AuthController = require("../controllers/authcontroller.js");
const { authMiddleware, authorizeRoles } = require("../controllers/authcontroller.js");

const router = express.Router();

router.post("/login", AuthController.login);

// secure routes
router.post("/", UserController.createUser);
router.get("/:id", authMiddleware, UserController.getUserById);
router.get("/", authMiddleware, authorizeRoles("admin"), UserController.getAllUsers);
router.put("/:id", authMiddleware,authorizeRoles("admin"),UserController.updateUser);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), UserController.deleteUser);

module.exports = router;
