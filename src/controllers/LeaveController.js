const Leave = require("../Models/Leave.js");

class LeaveController {
  // ==============================
  // Admin: Get all leave requests
  // ==============================
  static async getAllLeaves(req, res) {
    try {
      const leaves = await Leave.getAll();
      res.status(200).json({ success: true, data: leaves });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to fetch leaves" });
    }
  }

  // ==============================
  // Employee: Get own leaves
  // ==============================
  static async getLeavesByEmployee(req, res) {
    try {
      const employee_id = req.user.employee_id; // assumes user ID is in req.user
      const leaves = await Leave.getByEmployeeId(employee_id);
      res.status(200).json({ success: true, data: leaves });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to fetch your leaves" });
    }
  }

  // ==============================
  // Create a leave request
  // ==============================
  static async createLeave(req, res) {
    try {
      const { start_date, end_date, reason } = req.body;
      const employee_id = req.user.employee_id;

      const leave = await Leave.create({ employee_id, start_date, end_date, reason });
      res.status(201).json({ success: true, data: leave });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to create leave request" });
    }
  }

  // ==============================
  // Update a leave request
  // ==============================
  static async updateLeave(req, res) {
    try {
      const { leave_id } = req.params;
      const updates = req.body; // can contain status, reason, start_date, end_date, etc.

      const result = await Leave.update(leave_id, updates);
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Leave not found" });
      }

      res.status(200).json({ success: true, message: "Leave updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to update leave" });
    }
  }

  // ==============================
  // Delete a leave request
  // ==============================
  static async deleteLeave(req, res) {
    try {
      const { leave_id } = req.params;

      const result = await Leave.delete(leave_id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Leave not found" });
      }

      res.status(200).json({ success: true, message: "Leave deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to delete leave" });
    }
  }
}

module.exports = LeaveController;
