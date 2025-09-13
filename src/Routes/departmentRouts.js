const express = require("express");
const AuthController = require("../controllers/authcontroller.js");
const { authMiddleware, authorizeRoles } = require("../controllers/authcontroller.js");
const DepartmentController=require("../controllers/DepartmentController.js")

const router = express.Router();

// Apply middlewares: must be logged in + must be admin
router.post(
    "/", authMiddleware, authorizeRoles("admin"),DepartmentController.createDepartment
  );
  
  router.get(
    "/",
    AuthController.authMiddleware,
    AuthController.authorizeRoles("admin"),
    DepartmentController.getAllDepartments
  );
  
  router.get(
    "/:id",
    AuthController.authMiddleware,
    AuthController.authorizeRoles("admin"),
    DepartmentController.getDepartmentById
  );
  
  router.get(
    "/name/:name",
    AuthController.authMiddleware,
    AuthController.authorizeRoles("admin"),
    DepartmentController.getDepartmentByName
  );
  
  router.put(
    "/:id",
    AuthController.authMiddleware,
    AuthController.authorizeRoles("admin"),
    DepartmentController.updateDepartment
  );
  
  router.delete(
    "/:id",
    AuthController.authMiddleware,
    AuthController.authorizeRoles("admin"),
    DepartmentController.deleteDepartment
  );
  
  module.exports = router;