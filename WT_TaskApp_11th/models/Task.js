const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    status: {
        type: String,
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Task", taskSchema);