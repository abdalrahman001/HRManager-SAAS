// Models/employee.js
const pool = require("../../db/database.js");

class Employee {
  constructor(employee) {
    this.employee_id = employee.employee_id;
    this.first_name = employee.first_name;
    this.last_name = employee.last_name;
    this.date_of_birth = employee.date_of_birth;
    this.gender = employee.gender;
    this.hire_date = employee.hire_date;
    this.department_id = employee.department_id;
    this.position_id = employee.position_id;
    this.salary = employee.salary;
  }

  // Create employee
  static async createEmployee({
    first_name,
    last_name,
    date_of_birth,
    gender,
    department_id,
    position_id,
    salary,
  }) {
    const hire_date = new Date();
    const [result] = await pool.query(
      `INSERT INTO employees 
        (first_name, last_name, date_of_birth, gender, hire_date, department_id, position_id, salary) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, date_of_birth, gender, hire_date, department_id, position_id, salary]
    );
    return {
      employee_id: result.insertId,
      first_name,
      gender,
      hire_date,
      last_name,
      department_id,
      position_id,
      salary,
    };
  }

  // Find employee by id
  static async findEmployeeById(id) {
    const [rows] = await pool.query("SELECT * FROM employees WHERE employee_id = ?", [id]);
    return rows[0];
  }

  // Update employee (admin-level: can edit DOB and salary)
  static async updateEmployeeAdmin(id, { first_name, last_name, date_of_birth, department_id, position_id, salary }) {
    await pool.query(
      `UPDATE employees 
       SET first_name = ?, last_name = ?, date_of_birth = ?, department_id = ?, position_id = ?, salary = ? 
       WHERE employee_id = ?`,
      [first_name, last_name, date_of_birth, department_id, position_id, salary, id]
    );
    return this.findEmployeeById(id);
  }

  // Update employee (self-service: cannot edit DOB or salary)
  static async updateEmployee(id, { first_name, last_name, date_of_birth }) {
    await pool.query(
      `UPDATE employees 
       SET first_name = ?, last_name = ?, date_of_birth = ?
       WHERE employee_id = ?`,
      [first_name, last_name,date_of_birth, id]
    );
    return this.findEmployeeById(id);
  }

  // Delete employee
  static async deleteEmployee(id) {
    await pool.query("DELETE FROM employees WHERE employee_id = ?", [id]);
  }

  // Get all employees
  static async getAllEmployees() {
    const [rows] = await pool.query("SELECT * FROM employees");
    return rows;
  }
}

module.exports = Employee;
