const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/user.js");
const cfg = require("../../config/auth.js");

class AuthController {
  static signAccessToken(payload) {
    return jwt.sign(payload, cfg.ACCESS_TOKEN_SECRET, {
      expiresIn: cfg.ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  static authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access token required" });
    }

    jwt.verify(token, cfg.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      req.user = decoded; // will include employee_id now
      next();
    });
  }

  static authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Forbidden: insufficient rights" });
      }
      next();
    };
  }

  static async login(req, res) {
    try {
      const { email, employee_id, password } = req.body;
      if ((!email && !employee_id) || !password) {
        return res.status(400).json({
          message: "Email or EmployeeId and password are required",
        });
      }

      const userRow = await User.findByEmailOrEmployeeId(email, employee_id);
      if (!userRow) return res.status(401).json({ message: "Invalid credentials" });

      const ok = await bcrypt.compare(password, userRow.password_hash);
      if (!ok) return res.status(401).json({ message: "Invalid credentials" });

      // include both user_id and employee_id in payload
      const payload = { 
        sub: userRow.user_id, 
        role: userRow.role, 
        employee_id: userRow.employee_id 
      };

      const accessToken = AuthController.signAccessToken(payload);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        accessToken,
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = AuthController;
