const express = require("express");
const AuthController = require("../controllers/authcontroller.js");
const router = express.Router();

router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/logout", AuthController.logout);
    
module.exports = router;
