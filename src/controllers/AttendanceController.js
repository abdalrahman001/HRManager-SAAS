// src/controllers/AttendanceController.js
const Attendance = require("../Models/Attendance.js");
const cfg = require("../../config/auth.js");

class AttendanceController {
  // Log a new attendance event
  static async logEvent(req, res) {
    try {
      const { employee_id, event_type, event_time } = req.body;

      // fallback to current time if no event_time provided
      const time = event_time || new Date();

      // Validate event_type
      const validTypes = ["clock_in", "clock_out", "break_start", "break_end"];
      if (!validTypes.includes(event_type)) {
        return res.status(400).json({ success: false, message: "Invalid event type" });
      }

      const attendance = await Attendance.create({
        employee_id,
        event_type,
        event_time: time
      });

      return res.status(201).json({ success: true, data: attendance, message: "Attendance recorded successfully" });
    } catch (error) {
      console.error("logEvent Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  // Get all attendance for a specific employee
  static async getEmployeeAttendance(req, res) {
    try {
      const { employee_id } = req.params;

      const events = await Attendance.getByEmployeeId(employee_id);

      return res.status(200).json({ success: true, data: events });
    } catch (error) {
      console.error("getEmployeeAttendance Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  // Get all attendance events (Admin)
  static async getAllAttendance(req, res) {
    try {
      const events = await Attendance.getAll();
      return res.status(200).json({ success: true, data: events });
    } catch (error) {
      console.error("getAllAttendance Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  // Get attendance by date range
  static async getAttendanceByDateRange(req, res) {
    try {
      const { start, end } = req.query;

      // fallback to company start date if start not provided
      const startDate = start || cfg.attendanceStart;
      const endDate = end || new Date().toISOString();

      const events = await Attendance.getByDateRange(startDate, endDate);

      return res.status(200).json({ success: true, data: events });
    } catch (error) {
      console.error("getAttendanceByDateRange Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }
}

module.exports = AttendanceController;
