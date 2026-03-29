const express = require("express");
const router = express.Router();
const { register, login } = require("../contoller/authController");
const authMiddleware = require("../middlewares/authMiddleware");


router.post("/register", register);
router.post("/login", login);
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You are logged in", user: req.user });
});
router.post("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You are logged in", user: req.user });
});


module.exports = router;