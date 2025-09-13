// src/Controllers/PositionController.js
const Position = require("../Models/Position.js");

class PositionController {
  // Create
  static async create(req, res) {
    try {
      const { title, description } = req.body;
      const newPosition = await Position.createPosition({ title, description });
      return res.status(201).json({ success: true, data: newPosition, message: "Position created successfully" });
    } catch (error) {
      console.error("Create Position Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  // Get all
  static async getAll(req, res) {
    try {
      const positions = await Position.getAllPositions();
      return res.status(200).json({ success: true, data: positions });
    } catch (error) {
      console.error("GetAll Positions Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  // Get by ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const position = await Position.getPositionById(id);

      if (!position) {
        return res.status(404).json({ success: false, message: "Position not found" });
      }

      return res.status(200).json({ success: true, data: position });
    } catch (error) {
      console.error("Get Position By ID Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  // Update
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const positionExists = await Position.getPositionById(id);
      if (!positionExists) {
        return res.status(404).json({ success: false, message: "Position not found" });
      }

      const updatedPosition = await Position.updatePosition(id, { title, description });
      return res.status(200).json({ success: true, data: updatedPosition, message: "Position updated successfully" });
    } catch (error) {
      console.error("Update Position Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  // Delete
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const positionExists = await Position.getPositionById(id);
      if (!positionExists) {
        return res.status(404).json({ success: false, message: "Position not found" });
      }

      await Position.deletePosition(id);
      return res.status(200).json({ success: true, message: "Position deleted successfully" });
    } catch (error) {
      console.error("Delete Position Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }
}

module.exports = PositionController;
