const express = require("express");
const router = express.Router();
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🔴 CHECK IF EMAIL ALREADY EXISTS
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered ❌"
            });
        }

        // ✅ CREATE NEW USER
        const user = new User({ email, password });
        await user.save();

        res.json({ message: "User registered successfully ✅" });

    } catch (err) {
        console.log(err);

        // 🔴 HANDLE DUPLICATE ERROR (extra safety)
        if (err.code === 11000) {
            return res.status(400).json({
                message: "Email already exists ❌"
            });
        }

        res.status(500).json({ message: "Server error" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials ❌" });
        }

        res.json({ userId: user._id });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;