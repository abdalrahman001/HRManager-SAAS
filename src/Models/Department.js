const pool=require("../../db/database.js")

class Department {
  constructor(row) {
    this.department_id = row.department_id;
    this.name = row.name;
    this.description = row.description;
  }

  static async findAllDepartments() {
    const [rows] = await pool.query("SELECT * FROM departments");
    return rows.length > 0 ? rows : [];
  }

  static async findDepartmentById(id) {
    const [rows] = await pool.query("SELECT * FROM departments WHERE department_id = ?", [id]);
    return rows.length > 0 ? rows[0] : null;
  }
  static async findDepartmentByName(name) {
    const [rows] = await pool.query("SELECT * FROM departments WHERE name = ?", [name]);
    return rows.length > 0 ? rows[0] : null;
  }
  static async updateDepartment(department_id, { name, description }) {
    await pool.query(
      "UPDATE departments SET name = ?, description = ? WHERE department_id = ?",
      [name, description, department_id]
    );
    return this.findDepartmentById(department_id);
  }

  static async createDepartment(name, description) {
    const [result] = await pool.query(
      "INSERT INTO departments (name, description) VALUES (?, ?)",
      [name, description]
    );
    return { department_id: result.insertId, name, description };
  }

  static async deleteDepartment(id) {
    const [result] = await pool.query(
      "DELETE FROM departments WHERE department_id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Department;
