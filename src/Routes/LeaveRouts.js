// src/Routes/LeaveRoutes.js
const express = require("express");
const LeaveController = require("../controllers/LeaveController.js");
const { authMiddleware, authorizeRoles } = require("../controllers/authcontroller.js");

const router = express.Router();

// ==============================
// Employee routes (self only)
// ==============================

// Get all leaves of the logged-in employee
router.get(
    "/self",
    authMiddleware,
    async (req, res, next) => {
      // Force employee_id from JWT
      req.params.employee_id = req.user.employee_id;
      next();
    },
    LeaveController.getLeavesByEmployee
  );
  
  // Create a leave request
  router.post(
    "/self",
    authMiddleware,
    async (req, res, next) => {
      // Force employee_id from JWT
      req.body.employee_id = req.user.employee_id;
      next();
    },
    LeaveController.createLeave
  );

// Update own leave
router.put(
  "/self/:leave_id",
  authMiddleware,
  async (req, res, next) => {
    const employee_id = req.user.employee_id;
    const { leave_id } = req.params;

    // Check if leave belongs to the employee
    const leave = await LeaveController.getLeavesByEmployee(req, res);
    const leaveExists = leave.data.find(l => l.id == leave_id);
    if (!leaveExists) {
      return res.status(403).json({ success: false, message: "Forbidden: You can only update your own leaves" });
    }
    next();
  },
  LeaveController.updateLeave
);

// Delete own leave
router.delete(
  "/self/:leave_id",
  authMiddleware,
  async (req, res, next) => {
    const employee_id = req.user.employee_id;
    const { leave_id } = req.params;

    const leave = await LeaveController.getLeavesByEmployee(req, res);
    const leaveExists = leave.data.find(l => l.id == leave_id);
    if (!leaveExists) {
      return res.status(403).json({ success: false, message: "Forbidden: You can only delete your own leaves" });
    }
    next();
  },
  LeaveController.deleteLeave
);

// ==============================
// Admin routes
// ==============================

// Get all leaves
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  LeaveController.getAllLeaves
);

// Update any leave (admin)
router.put(
  "/:leave_id",
  authMiddleware,
  authorizeRoles("admin"),
  LeaveController.updateLeave
);

// Delete any leave (admin)
router.delete(
  "/:leave_id",
  authMiddleware,
  authorizeRoles("admin"),
  LeaveController.deleteLeave
);

module.exports = router;
