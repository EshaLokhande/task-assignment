const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {createTask,getTasks,updateTask,deleteTask} = require("../contoller/taskController");

// protected routes
router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;