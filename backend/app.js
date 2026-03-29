const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require("./src/routes/auth");
const taskRoutes = require("./src/routes/tasks");


app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("API running");
});

mongoose.connect("mongodb://127.0.0.1:27017/mydb")
  .then(() => console.log("MongoDB Connected ✅"))
    .catch((err) => console.log(err));
  

app.listen(5000, () => {
    console.log("Server running on port 5000");
})