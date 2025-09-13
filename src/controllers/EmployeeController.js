const Employee = require("../Models/Employee.js");

class EmployeeController {
  // ========================
  // Create new employee (Admin only)
  // ========================
  static async createEmployee(req, res) {
    try {
      const { first_name, last_name, date_of_birth, department_id,gender, position_id, salary } = req.body;

      if (!first_name || !last_name || !date_of_birth || !department_id || !position_id || !salary||!gender) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
      const newEmployee = await Employee.createEmployee({
        first_name,
        last_name,
        date_of_birth,
        department_id,
        gender,
        position_id,
        salary,
      });

      return res.status(201).json({
        success: true,
        data: newEmployee,
        message: "Employee created successfully",
      });
    } catch (error) {
      console.error("CreateEmployee Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  // ========================
  // Get all employees (Admin only)
  // ========================
  static async getAllEmployees(req, res) {
    try {
      const employees = await Employee.getAllEmployees();
      return res.status(200).json({ success: true, data: employees });
    } catch (error) {
      console.error("GetAllEmployees Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  // ========================
  // Get employee by ID (Admin or self checked in routes)
  // ========================
  static async getEmployeeById(req, res) {
    try {
      const { id } = req.params;
      const employee = await Employee.findEmployeeById(id);

      if (!employee) {
        return res.status(404).json({ success: false, message: "Employee not found" });
      }

      return res.status(200).json({ success: true, data: employee });
    } catch (error) {
      console.error("GetEmployeeById Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  // ========================
  // Admin update (can update everything)
  // ========================
  static async updateEmployeeAdmin(req, res) {
    try {
      const { id } = req.params;
      const employeeExists = await Employee.findEmployeeById(id);

      if (!employeeExists) {
        return res.status(404).json({ success: false, message: "Employee not found" });
      }

      const { first_name, last_name, date_of_birth, department_id, position_id, salary } = req.body;

      const updatedEmployee = await Employee.updateEmployeeAdmin(id, {
        first_name,
        last_name,
        date_of_birth,
        department_id,
        position_id,
        salary,
      });

      return res.status(200).json({ success: true, data: updatedEmployee, message: "Employee updated successfully (admin)" });
    } catch (error) {
      console.error("UpdateEmployeeAdmin Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  // ========================
  // Employee update (self only)
  // ========================
  static async updateEmployeeSelf(req, res) {
    try {
      const { id } = req.params;

      const employeeExists = await Employee.findEmployeeById(id);

      if (!employeeExists) {
        return res.status(404).json({ success: false, message: "Employee not found" });
      }

      const { first_name, last_name, date_of_birth } = req.body;

      const updatedEmployee = await Employee.updateEmployee(id, {
        first_name,
        last_name,
        date_of_birth,
      });

      return res.status(200).json({ success: true, data: updatedEmployee, message: "Employee updated successfully (self)" });
    } catch (error) {
      console.error("UpdateEmployeeSelf Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  // ========================
  // Delete employee (Admin only)
  // ========================
  static async deleteEmployee(req, res) {
    try {
      const { id } = req.params;
      const employeeExists = await Employee.findEmployeeById(id);

      if (!employeeExists) {
        return res.status(404).json({ success: false, message: "Employee not found" });
      }

      await Employee.deleteEmployee(id);

      return res.status(200).json({ success: true, message: "Employee deleted successfully" });
    } catch (error) {
      console.error("DeleteEmployee Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }
}

module.exports = EmployeeController;
