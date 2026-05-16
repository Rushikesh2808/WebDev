const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/smartdb")
    .then(() => console.log("MongoDB Connected"))
    .catch(() => console.log("DB Error"));

/* ================= MODELS ================= */

// USER
const User = mongoose.model("User", {
    name: String,
    email: String,
    password: String
});

// TASK
const Task = mongoose.model("Task", {
    name: String
});

// ORDER (IMPROVED STRUCTURE)
const Order = mongoose.model("Order", {
    items: [
        {
            name: String,
            price: Number
        }
    ],
    total: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

// OPTIONAL CART MODEL (if needed later)
const Cart = mongoose.model("Cart", {
    items: [
        {
            name: String,
            price: Number
        }
    ]
});

/* ================= AUTH ================= */

// REGISTER
app.post("/register", async (req, res) => {
    let u = new User(req.body);
    await u.save();
    res.send("Registered");
});

// LOGIN
app.post("/login", async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        });

        if (user) {
            res.send("Success");
        } else {
            res.send("Invalid");
        }
    } catch (err) {
        res.send("Error");
    }
});

/* ================= ORDER ================= */

// SAVE ORDER
app.post("/order", async (req, res) => {
    try {
        let { items, total } = req.body;

        if (!items || items.length === 0) {
            return res.send("Cart Empty");
        }

        let o = new Order({ items, total });
        await o.save();

        res.send("Order Saved");
    } catch (err) {
        res.send("Order Error");
    }
});

// GET ALL ORDERS
app.get("/orders", async (req, res) => {
    let data = await Order.find();
    res.json(data);
});

/* ================= TASK ================= */

// CREATE
app.post("/add", async (req, res) => {
    let t = new Task(req.body);
    await t.save();
    res.send("Added");
});

// READ
app.get("/tasks", async (req, res) => {
    let data = await Task.find();
    res.json(data);
});

// DELETE
app.delete("/delete/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.send("Deleted");
});

/* ================= START SERVER ================= */

app.listen(3000, () => console.log("Server started on port 3000"));