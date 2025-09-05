const pool = require("../db");

class Department {
  constructor(row) {
    this.department_id = row.department_id;
    this.name = row.name;
  }

  static async findAll() {
    const [rows] = await pool.query("SELECT * FROM departments");
    return rows.length > 0 ? rows : [];
  }

  static async findById(id) {
    const [rows] = await pool.query("SELECT * FROM departments WHERE department_id = ?", [id]);
    return rows.length > 0 ? rows[0] : null;
  }



  static async create(data) {
    const [result] = await pool.query("INSERT INTO departments (name) VALUES (?)", [data.name]);
    return { id: result.insertId, ...data };
  }

  static async delete(id) {
    const [result] = await pool.query("DELETE FROM departments WHERE department_id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Department;
