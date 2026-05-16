const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
    userId: String,
    name: String,
    category: String,
    history: {
        type: Map,
        of: String,
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Habit", habitSchema);