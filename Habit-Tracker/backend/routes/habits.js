const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit");

// ADD HABIT
router.post("/add", async (req, res) => {
    try {
        const habit = new Habit(req.body);
        await habit.save();
        res.json(habit);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error adding habit" });
    }
});

// GET HABITS BY USER
router.get("/:userId", async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.params.userId });
        res.json(habits);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching habits" });
    }
});

// UPDATE HABIT STATUS (FINAL FIX)
router.post("/update", async (req, res) => {
    const { habitId, date, status } = req.body;

    try {
        const habit = await Habit.findById(habitId);

        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }

        // ✅ Map fix
        if (status === null) {
            habit.history.delete(date);
        } else {
            habit.history.set(date, status);
        }

        // ✅ important for Map
        habit.markModified("history");

        await habit.save();

        res.json({ message: "Habit updated successfully" });

    } catch (err) {
        console.log("ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/habits/:id", async (req, res) => {
    try {
        await Habit.findByIdAndDelete(req.params.id);

        res.json({ success: true, message: "Habit deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Delete failed" });
    }
});

module.exports = router;