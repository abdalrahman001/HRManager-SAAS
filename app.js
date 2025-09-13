// src/app.js
const express = require("express");
const userRoutes=require("./src/Routes/userRoutes.js");
const departmentRouts=require("./src/Routes/departmentRouts.js");
const employeeRoutes=require("./src/Routes/EmployeeRouts.js");
const positionRoutes=require("./src/Routes/PositionRouts.js");
const attendanceRoutes=require("./src/Routes/AttendenceRouts.js");
const leaveRoutes=require("./src/Routes/LeaveRouts.js");
const app = express();
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
})
// middleware to parse JSON requests
app.use(express.json());
app.use("/users", userRoutes);
app.use("/departments", departmentRouts);
app.use("/employees", employeeRoutes);
app.use("/positions", positionRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/Leave", leaveRoutes);



// test route
app.get("/", (req, res) => {
  res.send("✅ Server is running");
});

module.exports = app;
