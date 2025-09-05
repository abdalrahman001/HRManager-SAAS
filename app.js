// src/app.js
const express = require("express");
const userRoutes=require("./src/Routes/userRoutes.js");
const app = express();
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
})
// middleware to parse JSON requests
app.use(express.json());
app.use("/users", userRoutes);

// test route
app.get("/", (req, res) => {
  res.send("✅ Server is running");
});

module.exports = app;
