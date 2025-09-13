const express = require("express");
const AttendanceController = require("../controllers/AttendanceController.js");
const AuthController = require("../controllers/authcontroller.js");

const router = express.Router();

// =======================
// Admin-only routes
// =======================

// Get all attendance events
router.get(
  "/",
  AuthController.authMiddleware,
  AuthController.authorizeRoles("admin"),
  AttendanceController.getAllAttendance
);

// Get attendance events by date range
router.get(
  "/range",
  AuthController.authMiddleware,
  AuthController.authorizeRoles("admin"),
  AttendanceController.getAttendanceByDateRange
);

// =======================
// Employee routes
// =======================

// Log attendance event (employee can log their own events)
router.post(
  "/",
  AuthController.authMiddleware,
  AttendanceController.logEvent
);

// Get all attendance for a specific employee
router.get(
  "/employee/:employee_id",
  AuthController.authMiddleware,
  AttendanceController.getEmployeeAttendance
);

module.exports = router;
