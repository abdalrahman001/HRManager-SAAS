// src/Models/Position.js
const pool = require("../../db/database.js");

class Position {
  constructor(position) {
    this.position_id = position.position_id;
    this.title = position.title;
    this.description = position.description;
  }

  // Create
  static async createPosition({ title, description }) {
    const [result] = await pool.query(
      "INSERT INTO positions (title, description) VALUES (?, ?)",
      [title, description]
    );
    return { position_id: result.insertId, title, description };
  }

  // Get all
  static async getAllPositions() {
    const [rows] = await pool.query("SELECT * FROM positions");
    return rows;
  }

  // Get by ID
  static async getPositionById(position_id) {
    const [rows] = await pool.query("SELECT * FROM positions WHERE position_id = ?", [position_id]);
    return rows[0];
  }

  // Update
  static async updatePosition(position_id, { title, description }) {
    await pool.query(
      "UPDATE positions SET title = ?, description = ? WHERE position_id = ?",
      [title, description, position_id]
    );
    return { position_id, title, description };
  }

  // Delete
  static async deletePosition(position_id) {
    await pool.query("DELETE FROM positions WHERE position_id = ?", [position_id]);
    return { message: "Position deleted successfully" };
  }
}

module.exports = Position;
