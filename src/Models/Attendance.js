// src/Models/Attendance.js
const pool=require("../../db/database.js")

class Attendance {
  constructor({ id, employee_id, event_type, event_time }) {
    this.id = id;
    this.employee_id = employee_id;
    this.event_type = event_type;
    this.event_time = event_time;
  }

  // Record a new attendance event
  static async create({ employee_id, event_type, event_time }) {
    const [result] = await pool.query(
      "INSERT INTO attendance_events (employee_id, event_type, event_time) VALUES (?, ?, ?)",
      [employee_id, event_type, event_time]
    );
    return { id: result.insertId, employee_id, event_type, event_time };
  }

  // Get all attendance records for a specific employee
  static async getByEmployeeId(employee_id) {
    const [rows] = await pool.query(
      "SELECT * FROM attendance_events WHERE employee_id = ? ORDER BY event_time DESC",
      [employee_id]
    );
    return rows;
  }

  // Get all attendance events (Admin)
  static async getAll() {
    const [rows] = await pool.query(
      "SELECT * FROM attendance_events ORDER BY event_time DESC"
    );
    return rows;
  }

  // Optional: Get events by date range
  static async getByDateRange(startDate, endDate) {
    const [rows] = await pool.query(
      "SELECT * FROM attendance_events WHERE event_time BETWEEN ? AND ? ORDER BY event_time DESC",
      [startDate, endDate]
    );
    return rows;
  }
}

module.exports = Attendance;
