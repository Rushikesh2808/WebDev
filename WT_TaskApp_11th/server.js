const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/taskDB')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const Task = require('./models/Task');

// ADD TASK
app.post('/add', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        status: req.body.status
    });
    await task.save();
    res.send("Task Added");
});

// GET TASKS
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// UPDATE
app.put('/update/:id', async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    });
    res.send("Updated");
});

// DELETE
app.delete('/delete/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.send("Deleted");
});

app.listen(3000, () => console.log("http://localhost:3000"));