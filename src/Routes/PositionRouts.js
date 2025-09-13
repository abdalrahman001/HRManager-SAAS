// src/Routes/PositionRoutes.js
const express = require("express");
const PositionController = require("../controllers/PositionController.js");
const AuthController = require("../controllers/authcontroller.js");

const router = express.Router();

router.post("/", AuthController.authMiddleware, AuthController.authorizeRoles("admin"), PositionController.create);
router.get("/", AuthController.authMiddleware, AuthController.authorizeRoles("admin"), PositionController.getAll);
router.get("/:id", AuthController.authMiddleware, AuthController.authorizeRoles("admin"), PositionController.getById);
router.put("/:id", AuthController.authMiddleware, AuthController.authorizeRoles("admin"), PositionController.update);
router.delete("/:id", AuthController.authMiddleware, AuthController.authorizeRoles("admin"), PositionController.delete);

module.exports = router;
