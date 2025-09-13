// routes/employeeRoutes.js
const express = require("express");
const EmployeeController = require("../controllers/EmployeeController.js");
const AuthController = require("../controllers/authcontroller.js");
const router = express.Router();


// =======================
// Admin-only routes
// =======================

// Create new employee
router.post(
  "/",
  AuthController.authMiddleware,
  AuthController.authorizeRoles("admin"),
  EmployeeController.createEmployee
);

// Get all employees
router.get(
  "/",
  AuthController.authMiddleware,
  AuthController.authorizeRoles("admin"),
  EmployeeController.getAllEmployees
);

// Get single employee (admin OR self)
router.get(
  "/:id",AuthController.authMiddleware,
  AuthController.authorizeRoles("admin"),
  EmployeeController.getEmployeeById
);

// Update employee (admin update)
router.put(
  "/admin/:id",
  AuthController.authMiddleware,
  AuthController.authorizeRoles("admin"),
  EmployeeController.updateEmployeeAdmin
);

// Delete employee
router.delete(
  "/:id",
  AuthController.authMiddleware,
  AuthController.authorizeRoles("admin"),
  EmployeeController.deleteEmployee
);

// =======================
// Employee self routes
// =======================

// Update own profile
router.put(
  "/self/:id/",
  AuthController.authMiddleware,
  (req, res, next) => {
    if (parseInt(req.user.employee_id) !== parseInt(req.params.id)) {
      return res
        .status(403)
        .json({ message: "Forbidden: you can only update your own profile" });
    }
    next();
  },
  EmployeeController.updateEmployeeSelf
);
module.exports = router;
