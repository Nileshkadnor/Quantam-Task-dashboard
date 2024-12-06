const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); 

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Error in /login route:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
